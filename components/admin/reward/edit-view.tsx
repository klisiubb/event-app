"use client";
import React from "react";
import { TextForm } from "@/components/admin/form/text-input";
import { TextAreaForm } from "@/components/admin/form/text-area-input";
import { ImageForm } from "@/components/admin/form/image-form";
import { NumberForm } from "../form/number-input";
import { Reward } from "@prisma/client";
import { RewardFormSchema } from "@/schemas/admin/reward";
import { UpdateReward } from "@/actions/admin/reward/update";

export const RewardEditView = ({ reward }: { reward: Reward }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
      <TextForm
        textFieldName="Name:"
        editText="Edit name"
        fieldName="name"
        textValue={reward.name}
        objectId={reward.id}
        validationSchema={RewardFormSchema.pick({ name: true })}
        updateAction={UpdateReward}
        placeholderText="E.g. `PS5 + 2 controllers.`"
      />
      <NumberForm
        numberFieldName="Quantity:"
        editText="Edit quantity"
        fieldName="quantity"
        numberValue={reward.quantity || null}
        objectId={reward.id}
        validationSchema={RewardFormSchema.pick({ quantity: true })}
        updateAction={UpdateReward}
        placeholderText="E.g. 10"
      />

      <ImageForm
        imageUrl={reward.imageUrl}
        objectId={reward.id}
        updateAction={UpdateReward}
      />
      <TextAreaForm
        textFieldName="Description:"
        editText="Edit description"
        fieldName="description"
        textValue={reward.description}
        objectId={reward.id}
        validationSchema={RewardFormSchema.pick({ description: true })}
        updateAction={UpdateReward}
        placeholderText="E.g. `Most pricy reward that you may win today!`"
      />
    </div>
  );
};
