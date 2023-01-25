require 'net/http'
require 'hangry'

class ScrapeRecipeController < ApplicationController
  def create
    puts params

    recipe_url = params[:values][:recipe_url]
    recipe_html_string = Net::HTTP.get(URI.parse(recipe_url)).force_encoding 'UTF-8'

    render json: { recipe: Hangry.parse(recipe_html_string) }
  rescue StandardError => e
    puts e
    puts render json: { error: e }
  end
end
