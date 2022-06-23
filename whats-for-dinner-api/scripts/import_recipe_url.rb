require 'net/http'
require 'uri'

uri = URI.parse('http://www.foodnetwork.com/recipes/rachael-ray/spinach-and-mushroom-stuffed-chicken-breasts-recipe/index.html')
recipe_html_string = Net::HTTP.get_response(uri)

collection = Microformats.parse(recipe_html_string)
puts collection
