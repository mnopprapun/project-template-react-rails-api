class CalendarSerializer < ActiveModel::Serializer
  attributes :id
  has_many :events
end
