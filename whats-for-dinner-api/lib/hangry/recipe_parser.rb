require 'hangry/canonical_url_parser'

module Hangry
  class RecipeParser
    attr_accessor :nokogiri_doc, :recipe

    def initialize(nokogiri_doc)
      self.nokogiri_doc = nokogiri_doc
    end

    def parse
      @recipe = Recipe.new
      initialize_nutrition
      RECIPE_ATTRIBUTES.each do |attribute|
        attr_value = value(send("parse_#{attribute}"))
        recipe.public_send("#{attribute}=", attr_value)
        next unless recipe.public_send(attribute).present?

        send("clean_#{attribute}", recipe) if respond_to? "clean_#{attribute}"
      end
      recipe
    end

    def self.can_parse?(html)
      new(html).can_parse?
    end

    def can_parse?
      !!recipe_ast
    end

    def recipe_ast
      return @recipe_ast if defined?(@recipe_ast)
      @recipe_ast = nokogiri_doc.css(self.class.root_selector).first
    end

    def nutrition_ast
      return @nutrition_ast if defined?(@nutrition_ast)
      @nutrition_ast = recipe_ast && recipe_ast.css(self.class.nutrition_selector)
    end

    protected

    def canonical_url_matches_domain?(domain)
      CanonicalUrlParser.new(nokogiri_doc).canonical_domain == domain
    end

    def canonical_url_includes?(phrase)
      !CanonicalUrlParser.new(nokogiri_doc).canonical_url.nil? && CanonicalUrlParser.new(nokogiri_doc).canonical_url.include?(phrase)
    end

    private

    class NullObject
      def method_missing(*args, &block)
        self
      end

      def blank?; true; end
      def present?; false; end
      def to_a; []; end
      def to_ary; []; end
      def to_s; ""; end
      def to_str; ""; end
      def to_f; 0.0; end
      def to_i; 0; end
    end

    def value(object)
      case object
      when NullObject then nil
      else object
      end
    end

    def maybe(value)
      case value
      when nil then NullObject.new
      else value
      end
    end

    def initialize_nutrition
      recipe.nutrition = {}
      NUTRITION_ATTRIBUTES.each do |attribute|
        recipe.nutrition[attribute] = nil
      end
    end

    def parse_canonical_url
      CanonicalUrlParser.new(nokogiri_doc).canonical_url
    end

    def parse_duration(iso8601_string)
      return nil unless iso8601_string.present?
      duration = ISO8601::Duration.new(iso8601_string)
      duration.hours.to_i * 60 + duration.minutes.to_i
    rescue ISO8601::Errors::UnknownPattern
      # Try to just convert to an integer.. Assuming minutes?
      iso8601_string.to_i
    end
  end
end
