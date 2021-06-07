import { Field, StringType, FieldType } from 'body-validator';

export interface IValidatable {
  schema: Field[];
}

export const userValidationSchema: IValidatable = {
  schema: [
    {
      name: 'email',
      required: true,
      stringType: StringType.Email,
    },
    {
      name: 'password',
      required: true,
      minlength: 4,
      maxlength: 20,
    },
    {
      name: 'adminSecret',
      required: false,
    },
  ],
};

export const recipeValidationSchema: IValidatable = {
  schema: [
    {
      name: 'name',
      required: true,
    },
    {
      name: 'description',
      required: false,
    },
    {
      name: 'instructions',
      required: false,
    },
    {
      name: 'url',
      required: true,
    },
    {
      name: 'preparationTime',
      required: true,
    },
    {
      name: 'ingredients',
      required: true,
      type: FieldType.List,
      minlength: 1,
      maxlength: 50,
    },
  ],
};
