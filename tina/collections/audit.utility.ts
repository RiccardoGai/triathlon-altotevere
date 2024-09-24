import { Form, TinaCMS, TinaField } from 'tinacms';

export const auditFields = [
  {
    name: 'createdBy',
    type: 'string',
    ui: {
      component: null
    }
  },
  {
    name: 'createdOn',
    type: 'datetime',
    ui: {
      component: null
    }
  },
  {
    name: 'updatedBy',
    type: 'string',
    ui: {
      component: null
    }
  },
  {
    name: 'updatedOn',
    type: 'datetime',
    ui: {
      component: null
    }
  }
] as TinaField[];

export const auditBeforeSubmit = async ({
  form,
  cms,
  values
}: {
  form: Form;
  cms: TinaCMS;
  values: Record<string, any>;
}): Promise<Record<string, any>> => {
  const isLocalMode = cms.api.tina?.isLocalMode;

  const user = isLocalMode
    ? process.env.NEXT_PUBLIC_LOCAL_USER_EMAIL
    : (await cms.api.tina?.authProvider?.getUser?.())?.email;
  return {
    ...values,
    ...(form.crudType === 'create' && {
      createdBy: user,
      createdOn: new Date().toISOString()
    }),
    ...(form.crudType === 'update' && {
      updatedBy: user,
      updatedOn: new Date().toISOString()
    })
  };
};
