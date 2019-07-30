export const storageSchema = {
  name: '',
  mountName: '',
  resouceQuota: 0,
  max: 20,
  marks: {
    0: '存储',
    20: '20G'
  },
  sliderUnit: 'G',
  accessAttributes: '1',
  options: [
    {
      value: '选项1',
      label: '1'
    },
    {
      value: '选项2',
      label: '2'
    }
  ],
  optionValue: '',
  disabled: true,
  isExpand: true
}

export const databaseSchema = {
  name: '',
  userName: '',
  password: '',
  sliderData: [
    { max: 20, defaultNum: 0, unit: '核', name: 'CPU' },
    { max: 20, defaultNum: 0, unit: 'G', name: '内存' },
    { max: 20, defaultNum: 0, unit: 'G', name: '存储' }
  ],
  option: {
    types: [
      {
        value: '选项1',
        label: '1'
      },
      {
        value: '选项2',
        label: '2'
      }
    ],
    versions: [
      {
        value: '选项1',
        label: '1'
      },
      {
        value: '选项2',
        label: '2'
      }
    ]
  },
  typeOption: '',
  versionsOption: '',
  disabled: true,
  isExpand: true
}
