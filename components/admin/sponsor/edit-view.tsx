"use client";
import { Sponsor } from "@prisma/client";
import React from "react";
import { TextForm } from "@/components/admin/form/text-input";
import { TextAreaForm } from "@/components/admin/form/text-area-input";
import { ImageForm } from "@/components/admin/form/image-form";
import { SponsorFormSchema } from "@/schemas/admin/sponsor";
import { UpdateSponsor } from "@/actions/admin/sponsor/update";
import { NumberForm } from "../form/number-input";

export const SponsorEditView = ({ sponsor }: { sponsor: Sponsor }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
      <TextForm
        textFieldName="Name:"
        editText="Edit name"
        fieldName="name"
        textValue={sponsor.name}
        objectId={sponsor.id}
        validationSchema={SponsorFormSchema.pick({ name: true })}
        updateAction={UpdateSponsor}
        placeholderText="E.g. `Sponsor 1!`"
      />
      <TextForm
        textFieldName="Website:"
        editText="Edit website"
        fieldName="websiteUrl"
        textValue={sponsor.websiteUrl}
        objectId={sponsor.id}
        validationSchema={SponsorFormSchema.pick({ websiteUrl: true })}
        updateAction={UpdateSponsor}
        placeholderText="E.g. `www.react.com!`"
      />

      <ImageForm
        imageUrl={sponsor.imageUrl}
        objectId={sponsor.id}
        updateAction={UpdateSponsor}
      />
      <TextAreaForm
        textFieldName="Description:"
        editText="Edit description"
        fieldName="description"
        textValue={sponsor.description}
        objectId={sponsor.id}
        validationSchema={SponsorFormSchema.pick({ description: true })}
        updateAction={UpdateSponsor}
        placeholderText="E.g. `Sponsor 1 is leading React...`"
      />
    </div>
  );
};
