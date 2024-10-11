"use client";
import React from "react";
import { TextForm } from "@/components/admin/form/text-input";
import { UserFormSchema } from "@/schemas/admin/user";
import { User } from "@prisma/client";
import { UpdateUser } from "@/actions/admin/user/update";

export const UserEditView = ({ user }: { user: User }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
      <TextForm
        textFieldName="First name:"
        editText="Edit first name"
        fieldName="firstName"
        textValue={user.firstName}
        objectId={user.id}
        validationSchema={UserFormSchema.pick({ firstName: true })}
        updateAction={UpdateUser}
        placeholderText="E.g. `Jan`"
      />
      <TextForm
        textFieldName="Last name:"
        editText="Edit last name"
        fieldName="lastName"
        textValue={user.lastName}
        objectId={user.id}
        validationSchema={UserFormSchema.pick({ lastName: true })}
        updateAction={UpdateUser}
        placeholderText="E.g. `Nowak`"
      />
    </div>
  );
};
