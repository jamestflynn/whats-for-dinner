module Types
  class BaseObject < GraphQL::Schema::Object
    def current_user
      context[:current_user]
    end

    edge_type_class(Types::BaseEdge)
    connection_type_class(Types::BaseConnection)
    field_class Types::BaseField
  end
end
