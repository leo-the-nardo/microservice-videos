import { UniqueEntityId } from '../../../@shared/domain'
import { AggregateRoot } from '../../../@shared/domain/entity/aggregate-root'
import { EntityValidationError } from '../../../@shared/domain/errors/validation.error'
import CategoryValidatorFactory from '../validators/category.validator'

export type CategoryProps = {
  name: string
  isActive?: boolean
  description?: string
  createdAt?: Date
}

export type CategoryJsonProps = {
  id: string
  name: string
  is_active: boolean
  description: string
  created_at: Date
}
export class CategoryEntity extends AggregateRoot<
  CategoryProps,
  CategoryJsonProps
> {
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
    const isValid = validator.validate(props)
    if (!isValid) throw new EntityValidationError(validator.errors)
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

  toJSON(): CategoryJsonProps {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      is_active: this.isActive,
      created_at: this.createdAt,
    }
  }
}
