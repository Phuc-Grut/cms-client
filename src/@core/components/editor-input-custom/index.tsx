import { Controller } from "react-hook-form"
import { Label, FormFeedback } from "reactstrap"
import classnames from "classnames"
import {
  Count,
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar
} from "@syncfusion/ej2-react-richtexteditor"

const toolbarSettings: any = {
  items: [
    'Bold', 'Italic', 'Underline', 'StrikeThrough',
    'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
    'LowerCase', 'UpperCase', '|',
    'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
    'Outdent', 'Indent', '|',
    'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
    'SourceCode', 'FullScreen', '|', 'Undo', 'Redo'
  ],
  type: 'Expand'
}

const EditorInput = ({ control, name, label, labelSeize, required, errors, disabled, height, placeholder }: any) => {

  return (
    <>
      <div
        className={classnames({
          [labelSeize]: labelSeize,
          'form-row-inline-error': errors
        })}
      >
        {
          (disabled) ? <Label className="form-label" style={{ fontWeight: "600" }} for={name}>
            {label}:
          </Label> : (required ? <Label className="form-label" for={name}>
            {label} <span className="text-danger">*</span>
          </Label> : <Label className="form-label" for={name}>
            {label}  </Label>)
        }
        <div className='form-input-content'>
          {disabled ? <Controller
            name={name}
            control={control}
            render={
              ({ field: { value } }) => (
                <div>
                  {value ? value : "Chưa cập nhật"}
                </div>
              )}
          /> : <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange} }) => {
              return (
                <RichTextEditorComponent
                  toolbarSettings={toolbarSettings}
                  name={name}
                  height={height ? height : 200}
                  showCharCount={true}
                  // maxLength={100}
                  placeholder={placeholder}
                  value={value}
                  change={(val: any) => onChange(val.value)}
                >
                  <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar, Count]}/>
                </RichTextEditorComponent>
              )
            }}
          />
          }
          {errors && <FormFeedback>{errors?.message}</FormFeedback>}
        </div>
      </div>
    </>
  )
}
export default EditorInput