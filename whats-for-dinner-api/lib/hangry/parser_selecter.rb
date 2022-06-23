require 'hangry/recipe_parser'
require 'hangry/null_recipe_parser'
require 'hangry/hrecipe_parser'
require 'hangry/schema_org_recipe_parser'
require 'hangry/data_vocabulary_recipe_parser'
require 'hangry/json_ld_parser'

require 'hangry/parsers/non_standard/eating_well_parser'
require 'hangry/parsers/non_standard/epicurious_parser'
require 'hangry/parsers/non_standard/jamie_oliver_parser'
require 'hangry/parsers/non_standard/rachaelray_parser'

module Hangry
  class ParserSelector
    def initialize(nokogiri_doc)
      nokogiri_doc = Nokogiri::HTML(nokogiri_doc) if nokogiri_doc.is_a?(String)
      @nokogiri_doc = nokogiri_doc
    end

    def parser
      # Prefer the more specific parsers
      parser_classes = [
        Parsers::NonStandard::EatingWellParser,
        Parsers::NonStandard::EpicuriousParser,
        Parsers::NonStandard::JamieOliverParser,
        Parsers::NonStandard::RachaelRayParser
      ]
      parser_classes += [JsonLDParser, SchemaOrgRecipeParser, HRecipeParser, DataVocabularyRecipeParser]
      parser_classes.each do |parser_class|
        parser = parser_class.new(@nokogiri_doc)
        return parser if parser.can_parse?
      end
      NullRecipeParser.new(@nokogiri_doc)
    end
  end
end
