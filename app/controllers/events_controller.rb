class EventsController < ApplicationController

    def index
        events = Event.all
        render json: events
    end

    def create
		event = Event.create!(event_params)
		render json: event, status: :created
	  end 

    def destroy
        event = find_event
        event.destroy
        head :no_content
    end

    private

    def event_params
        params.permit(:calendar_id, :title, :start, :end)
    end

end
