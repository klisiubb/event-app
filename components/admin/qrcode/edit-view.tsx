"use client";
import { QrCode } from "@prisma/client";
import React from "react";
import { TextForm } from "@/components/admin/form/text-input";
import { NumberForm } from "../form/number-input";
import { QRCodeFormSchema } from "@/schemas/admin/qrcode";
import { UpdateQRcode } from "@/actions/admin/qrcode/update";

export const QRCodeEditView = ({ qrcode }: { qrcode: QrCode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
      <TextForm
        textFieldName="Name:"
        editText="Edit name"
        fieldName="name"
        textValue={qrcode.name}
        objectId={qrcode.id}
        validationSchema={QRCodeFormSchema.pick({ name: true })}
        updateAction={UpdateQRcode}
        placeholderText="E.g. `QRCode for Sponsor XYZ`"
      />
      <NumberForm
        numberFieldName="Value:"
        editText="Edit value"
        fieldName="value"
        numberValue={qrcode.value || null}
        objectId={qrcode.id}
        validationSchema={QRCodeFormSchema.pick({ value: true })}
        updateAction={UpdateQRcode}
        placeholderText="E.g. 20"
      />
      <NumberForm
        numberFieldName="Max uses:"
        editText="Edit max uses"
        fieldName="maxUses"
        numberValue={qrcode.maxUses || null}
        objectId={qrcode.id}
        validationSchema={QRCodeFormSchema.pick({ maxUses: true })}
        updateAction={UpdateQRcode}
        placeholderText="E.g. 100"
      />
    </div>
  );
};
