Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: "graphql#execute"
  end
  post '/graphql', to: 'graphql#execute'
  get '/me/', to: 'users#show'
  delete '/sessions/', to: 'sessions#destroy'
  post '/scrape_recipe/', to: 'scrape_recipe#create'
end
