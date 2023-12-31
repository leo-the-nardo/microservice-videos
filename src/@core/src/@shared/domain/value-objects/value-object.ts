export default abstract class ValueObject<Value = any> {
  protected readonly _value: Value

  constructor(value: Value) {
    this._value = Object.freeze(value)
  }

  get value(): Value {
    return this._value
  }

  // overrides object prototype.toString()
  toString = () => {
    if (typeof this.value !== 'object' || this.value === null) {
      try {
        return this.value.toString()
      } catch (e) {
        return this.value + ''
      }
    }
    const value = this.value.toString()
    return value === '[object Object]' ? JSON.stringify(this.value) : value
  }
}
