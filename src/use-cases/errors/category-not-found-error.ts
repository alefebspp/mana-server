export class CategoryNotFoundError extends Error {
  constructor() {
    super('Category with the informed id does not exists.')
  }
}