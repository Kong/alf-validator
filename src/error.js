export default function ALFError (errors) {
  this.name = 'ALFError'
  this.errors = errors
}

ALFError.prototype = Error.prototype
