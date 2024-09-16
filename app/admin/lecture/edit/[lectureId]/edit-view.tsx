"use client";
import { Lecture } from "@prisma/client";
import React from "react";
import { ImageForm } from "../../_components/image-form";
import { TextForm } from "@/components/admin/form/text-input";
import { LectureFormSchema } from "@/schemas/admin/lecture";
import { UpdateLecture } from "@/actions/admin/lecture/update";
import { TextAreaForm } from "@/components/admin/form/text-area-input";
import { DateForm } from "@/components/admin/form/date-picker";
export const EditView = ({ lecture }: { lecture: Lecture }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
      <TextForm
        textFieldName="Topic:"
        editText="Edit topic"
        fieldName="topic"
        textValue={lecture.topic}
        objectId={lecture.id}
        validationSchema={LectureFormSchema.pick({ topic: true })}
        updateAction={UpdateLecture}
        placeholderText="E.g. `React for beginners!`"
      />
      <TextForm
        textFieldName="Room:"
        editText="Edit room"
        fieldName="room"
        textValue={lecture.room || ""}
        objectId={lecture.id}
        validationSchema={LectureFormSchema.pick({ room: true })}
        updateAction={UpdateLecture}
        placeholderText="E.g. A204`"
      />
      <DateForm
        editText="Edit start date"
        dateFieldName="Start Date:"
        fieldName="startDate"
        dateValue={lecture.startDate || new Date()}
        objectId={lecture.id}
        validationSchema={LectureFormSchema.pick({ startDate: true })}
        updateAction={UpdateLecture}
      />
      <DateForm
        editText="Edit end date"
        dateFieldName="End Date:"
        fieldName="endDate"
        dateValue={lecture.endDate || new Date()}
        objectId={lecture.id}
        validationSchema={LectureFormSchema.pick({ endDate: true })}
        updateAction={UpdateLecture}
      />
      <ImageForm imageUrl={lecture.imageUrl} lectureId={lecture.id} />
      <TextAreaForm
        textFieldName="Description:"
        editText="Edit description"
        fieldName="description"
        textValue={lecture.description}
        objectId={lecture.id}
        validationSchema={LectureFormSchema.pick({ description: true })}
        updateAction={UpdateLecture}
        placeholderText="E.g. `Best react course for students. Learn from the best teachers!`"
      />
    </div>
  );
};
