import grails.converters.*

class DataController {
  def details = {
    Thread.sleep(1000);
    def people = [
      [ firstName: 'John', lastName: 'Doe', phone: '1234567890' ],
      [ firstName: 'Jane', lastName: 'Smith', phone: '0987654321' ]
    ]
    render text: people as JSON, contentType: 'application/json'
  }
}
