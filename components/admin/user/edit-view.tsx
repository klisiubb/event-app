"use client";
import React from "react";
import { TextForm } from "@/components/admin/form/text-input";
import { UserFormSchema } from "@/schemas/admin/user";
import { Role, User, Workshop } from "@prisma/client";
import { UpdateUser } from "@/actions/admin/user/update";
import { WorkshopSelectForm } from "../form/workshop-select";

export const UserEditView = ({
  user,
  workshops,
}: {
  user: User;
  workshops: Workshop[];
}) => {
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
      {user.role === Role.USER ? (
        <WorkshopSelectForm
          data={workshops}
          textFieldName="Workshop"
          editText="Change workshop"
          fieldName="workshopToAttendId"
          workshopToAttendId={user.workshopToAttendId}
          objectId={user.id}
          validationSchema={UserFormSchema.pick({ workshopToAttendId: true })}
          updateAction={UpdateUser}
          placeholderText="Select workshop from list..."
        />
      ) : (
        <></>
      )}
    </div>
  );
};
