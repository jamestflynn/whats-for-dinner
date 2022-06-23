class Session < ApplicationRecord
  belongs_to :user

  before_save :generate_uuid

  protected

  def generate_uuid
    self.uuid = SecureRandom.uuid if uuid.nil?
  end
end
