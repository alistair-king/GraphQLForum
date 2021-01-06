export const getEditorConfig = (isAdmin) => ({
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
    ...(isAdmin && {
      html: {
        buttons: [
          'html'
        ],
        'buttonsVisible': 1
      }
    })
  }
})
