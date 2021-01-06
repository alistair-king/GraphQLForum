import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { useAuth } from 'react-use-auth'
import FroalaEditorComponent from 'react-froala-wysiwyg';

export const TextEditor: React.FC<{
  control: Control,
  name: string
}> = ({
  control,
  name
}) => {
  const { isAuthenticated } = useAuth()
  const config = {
    placeholderText: '',
    charCounterCount: false,
    theme: 'gray',
    toolbarButtonsSM: {
      moreText: {
        buttons: [
          'bold',
          'italic',
          'underline',
          'strikeThrough',
          'clearFormatting'
        ],
        buttonsVisible: 2
      },
      moreParagraph: {
        buttons: [
          'paragraphFormat',
          'quote',
          'alignLeft',
          'alignCenter', 
          'alignRight',
          'alignJustify',
          'formatOLSimple',
          'formatUL',
          'outdent',
          'indent'
        ],
        'buttonsVisible': 1
      },
      image: {
        buttons: [
          'insertImage'
        ],
        'buttonsVisible': 1
      },
      ...(isAuthenticated('Administrator') && {
        html: {
          buttons: [
            'html'
          ],
          'buttonsVisible': 1
        }
      })
    }
  }

  return (<Controller
    control={control}
    name={name}
    render={({ onChange, value }) => (
      <FroalaEditorComponent
        model={value}
        onModelChange={onChange}
        config={config}
      />
    )}
  />)
}
