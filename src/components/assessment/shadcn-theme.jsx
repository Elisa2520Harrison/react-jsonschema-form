import React, { useState } from "react";

// shadcn components
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ---------------- FIELD TEMPLATE ----------------
export const CustomFieldTemplate = (props) => {
  const { label, children, errors, help, required, description, schema } = props;

  return (
    <div className="space-y-2 mb-6">
      {label && schema.type !== "boolean" && (
        <div className="text-base font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </div>
      )}

      <div>{children}</div>

      {description && schema.type !== "boolean" && (
        <div className="text-sm text-gray-500">{description}</div>
      )}

      {errors && errors.length > 0 && (
        <div className="text-sm text-red-600">
          {errors.map((e, i) => (
            <div key={i}>{e}</div>
          ))}
        </div>
      )}

      {help && <div className="text-sm text-gray-500">{help}</div>}
    </div>
  );
};

// ---------------- TEXT INPUT / TEXTAREA ----------------
export const CustomTextWidget = (props) => {
  const { id, value, onChange, options, uiSchema } = props;

  const isTextarea =
    uiSchema?.["ui:widget"] === "textarea" ||
    options?.multiline ||
    options?.rows;

  if (isTextarea) {
    return (
      <Textarea
        id={id}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={options?.rows || uiSchema?.["ui:options"]?.rows || 5}
        className="
          w-full
          min-h-[100px]
          border border-gray-400
          rounded-md
          p-3
          bg-white
          focus:border-blue-500
          focus:ring-1 focus:ring-blue-500
          resize-y
        "
      />
    );
  }

  return (
    <Input
      id={id}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="
        w-full
        border border-gray-400
        bg-white
        focus:border-blue-500
        focus:ring-1 focus:ring-blue-500
      "
    />
  );
};

// ---------------- SELECT ----------------
export const CustomSelectWidget = (props) => {
  const { id, value = "", onChange, schema } = props;

  const options = schema.enum || [];
  const names = schema.enumNames || options;

  return (
    <div className="w-full">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          h-10
          border border-gray-400
          bg-white
          rounded-md
          px-3
          text-sm
          focus:border-blue-500
          focus:ring-1 focus:ring-blue-500
        "
      >
        <option value="">Select an option</option>
        {options.map((opt, i) => (
          <option key={opt} value={opt}>
            {names[i]}
          </option>
        ))}
      </select>
    </div>
  );
};

// ---------------- CHECKBOX (FIXED - with blue checkmark and spacing) ----------------
export const CustomCheckboxWidget = (props) => {
  const { id, label, value, onChange } = props;

  return (
    <div className="flex items-center gap-3 py-2">
      <Checkbox
        id={id}
        checked={value || false}
        onCheckedChange={(val) => onChange(val)}
        className="h-5 w-5 text-blue-600 focus:ring-blue-500 rounded border-gray-400"
      />
      <Label htmlFor={id} className="cursor-pointer text-base font-normal">
        {label}
      </Label>
    </div>
  );
};

// ---------------- MULTI-LINE TEXTAREA (grows with Enter key) ----------------
export const CustomTextareaWidget = (props) => {
  const { id, value = "", onChange, options } = props;
  
  return (
    <Textarea
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={options?.rows || 4}
      placeholder={options?.placeholder || ""}
      className="
        w-full
        min-h-[100px]
        border border-gray-400
        rounded-md
        p-3
        bg-white
        focus:border-blue-500
        focus:ring-1 focus:ring-blue-500
        resize-y
      "
    />
  );
};

// ---------------- OBJECT FIELD ----------------
export const CustomObjectFieldTemplate = (props) => {
  const { title, description, properties } = props;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && (
          <div className="text-sm text-gray-500">{description}</div>
        )}
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {properties.map((prop, i) => (
            <div key={i}>{prop.content}</div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// ---------------- BUTTON TEMPLATE ----------------
export const CustomButtonTemplate = () => {
  return null;
};

// ---------------- THEME EXPORT ----------------
export const shadcnTheme = {
  templates: {
    FieldTemplate: CustomFieldTemplate,
    ObjectFieldTemplate: CustomObjectFieldTemplate,
    Button: CustomButtonTemplate,
  },
  widgets: {
    TextWidget: CustomTextWidget,
    SelectWidget: CustomSelectWidget,
    CheckboxWidget: CustomCheckboxWidget,
    TextareaWidget: CustomTextareaWidget,
  },
};