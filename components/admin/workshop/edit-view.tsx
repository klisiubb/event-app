"use client";
import { Workshop } from "@prisma/client";
import React from "react";
import { TextForm } from "@/components/admin/form/text-input";
import { TextAreaForm } from "@/components/admin/form/text-area-input";
import { DateForm } from "@/components/admin/form/date-picker";
import { ImageForm } from "@/components/admin/form/image-form";
import { WorkshopFormSchema } from "@/schemas/admin/workshop";
import { UpdateWorkshop } from "@/actions/admin/workshop/update";
import { NumberForm } from "../form/number-input";

export const WorkshopEditView = ({ workshop }: { workshop: Workshop }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
      <TextForm
        textFieldName="Topic:"
        editText="Edit topic"
        fieldName="topic"
        textValue={workshop.topic}
        objectId={workshop.id}
        validationSchema={WorkshopFormSchema.pick({ topic: true })}
        updateAction={UpdateWorkshop}
        placeholderText="E.g. `React for beginners!`"
      />
      <TextForm
        textFieldName="Room:"
        editText="Edit room"
        fieldName="room"
        textValue={workshop.room || ""}
        objectId={workshop.id}
        validationSchema={WorkshopFormSchema.pick({ room: true })}
        updateAction={UpdateWorkshop}
        placeholderText="E.g. A204`"
      />
      <DateForm
        editText="Edit start date"
        dateFieldName="Start Date:"
        fieldName="startDate"
        dateValue={workshop.startDate || new Date()}
        objectId={workshop.id}
        validationSchema={WorkshopFormSchema.pick({ startDate: true })}
        updateAction={UpdateWorkshop}
      />
      <DateForm
        editText="Edit end date"
        dateFieldName="End Date:"
        fieldName="endDate"
        dateValue={workshop.endDate || new Date()}
        objectId={workshop.id}
        validationSchema={WorkshopFormSchema.pick({ endDate: true })}
        updateAction={UpdateWorkshop}
      />
      <ImageForm
        imageUrl={workshop.imageUrl}
        objectId={workshop.id}
        updateAction={UpdateWorkshop}
      />
      <TextAreaForm
        textFieldName="Description:"
        editText="Edit description"
        fieldName="description"
        textValue={workshop.description}
        objectId={workshop.id}
        validationSchema={WorkshopFormSchema.pick({ description: true })}
        updateAction={UpdateWorkshop}
        placeholderText="E.g. `Best react course for students. Learn from the best teachers!`"
      />
      <NumberForm
        numberFieldName="Max attenders:"
        editText="Edit max attenders"
        fieldName="maxAttenders"
        numberValue={workshop.maxAttenders || null}
        objectId={workshop.id}
        validationSchema={WorkshopFormSchema.pick({ maxAttenders: true })}
        updateAction={UpdateWorkshop}
        placeholderText="E.g. 25"
      />
    </div>
  );
};
