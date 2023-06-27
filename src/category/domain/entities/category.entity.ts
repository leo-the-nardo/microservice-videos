import { Entity } from '../../../@shared/domain/entity/entity'
import { UniqueEntityId } from '../../../@shared/domain/value-objects/id.value-object'
import CategoryValidatorFactory from '../validators/category.validator'

export type CategoryProps = {
  name: string
  isActive?: boolean
  description?: string
  createdAt?: Date
}
export class CategoryEntity extends Entity<CategoryProps> {
  constructor(public readonly props: CategoryProps, id?: UniqueEntityId) {
    CategoryEntity.validate(props)
    super(props, id)
    this.props.description = props.description ?? null
    this.props.isActive = props.isActive ?? true
    this.props.createdAt = props.createdAt ?? new Date()
  }

  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get createdAt() {
    return this.props.createdAt
  }

  get isActive() {
    return this.props.isActive
  }

  static validate(props: CategoryProps) {
    const validator = CategoryValidatorFactory.create()
    validator.validate(props)
  }

  activate() {
    this.props.isActive = true
  }

  deactivate() {
    this.props.isActive = false
  }

  update(propsValues: { name: string; description: string }) {
    CategoryEntity.validate({
      name: propsValues.name,
      description: propsValues.description,
    })
    this.props.description = propsValues.description
    this.props.name = propsValues.name
  }
}