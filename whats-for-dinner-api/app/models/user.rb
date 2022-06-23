class User < ApplicationRecord
  after_create :set_default_session

  has_many :votes
  has_many :favorites
  has_many :meal_plans

  has_one :session

  has_secure_password

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format:
    { with: URI::MailTo::EMAIL_REGEXP }

  def set_default_session
    return if session_id

    session = Session.create(user: self)
    update_column(:session_id, session.id)
  end
end
