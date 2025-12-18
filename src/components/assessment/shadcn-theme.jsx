import React from 'react';

// Import shadcn components
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

// Custom Field Template for RJSF
export const CustomFieldTemplate = (props) => {
  const { id, label, children, errors, help, required, description, schema } = props;
  
  return (
    <div className="space-y-2 mb-6">
      {label && schema.type !== 'boolean' && (
        <div className="text-base font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </div>
      )}
      
      <div className="mt-1">
        {children}
      </div>
      
      {description && schema.type !== 'boolean' && (
        <div className="text-sm text-gray-500 mt-1">{description}</div>
      )}
      
      {errors && errors.length > 0 && (
        <div className="text-sm text-red-600 mt-1">
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}
      
      {help && (
        <div className="text-sm text-gray-500 mt-1">{help}</div>
      )}
    </div>
  );
};

// Text Widget for RJSF
export const CustomTextWidget = (props) => {
  const { id, label, value, required, onChange, options, schema, uiSchema } = props;
  
  const isTextarea = uiSchema?.['ui:widget'] === 'textarea' || 
                    options?.multiline || 
                    schema.format === 'textarea';
  
  if (isTextarea) {
    return (
      <Textarea
        id={id}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
        rows={options?.rows || uiSchema?.['ui:options']?.rows || 4}
        className="min-h-[100px] w-full"
      />
    );
  }
  
  return (
    <Input
      id={id}
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={label}
      className="w-full"
    />
  );
};

//  Select Widget using native HTML select styled like shadcn
export const CustomSelectWidget = (props) => {
  const { 
    id, 
    label, 
    value = '', 
    required, 
    onChange, 
    schema,
    options = {} 
  } = props;
  
  const enumOptions = schema.enum || [];
  const enumNames = schema.enumNames || enumOptions;
  
  const handleChange = (e) => {
    onChange(e.target.value);
  };
  
  return (
    <div className="relative w-full">
      <select
        id={id}
        value={value}
        onChange={handleChange}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.5em 1.5em',
          paddingRight: '2.5rem',
        }}
      >
        <option value="">{label || "Select an option"}</option>
        {enumOptions.map((option, index) => (
          <option key={option} value={option}>
            {enumNames[index] || option}
          </option>
        ))}
      </select>
    </div>
  );
};

// Checkbox Widget for RJSF
export const CustomCheckboxWidget = (props) => {
  const { id, label, value, onChange } = props;
  
  return (
    <div className="flex items-center space-x-2 mt-2">
      <Checkbox
        id={id}
        checked={value || false}
        onCheckedChange={(checked) => onChange(checked)}
      />
      <Label htmlFor={id} className="cursor-pointer">
        {label}
      </Label>
    </div>
  );
};

// Object Field Template for grouping
export const CustomObjectFieldTemplate = (props) => {
  const { title, description, properties } = props;
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && (
          <div className="text-sm text-gray-600">{description}</div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {properties.map((prop, index) => (
            <div key={index}>{prop.content}</div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Export the theme object
export const shadcnTheme = {
  templates: {
    FieldTemplate: CustomFieldTemplate,
    ObjectFieldTemplate: CustomObjectFieldTemplate,
  },
  widgets: {
    TextWidget: CustomTextWidget,
    SelectWidget: CustomSelectWidget,
    CheckboxWidget: CustomCheckboxWidget,
  },
};