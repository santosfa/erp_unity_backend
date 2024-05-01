const db = require('../../config/database');
const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  formId: { type: String, required: true, unique: true },
  version: { type: String, default:'' },
  header: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    referenceGuide: { type: String, default: ''},
    expiration: {
      type: Date,
      required: true,
      validate: {
        validator: date => date > new Date(),
        message: 'A data de expiração deve estar no futuro.',
      },
    },
    active: { type: Boolean, default: false },
    reasonForChange: { type: String, default:''},
    subjectToAccessControl: { type: Boolean, default: false },
  },
  group: [{
    groupTitle: { type: String, required: true },
    groupDescription: { type: String, required: true },
    components: [{
      icon: { type: String, default:'Pen' },
      type: {
        type: String,
        enum: ['dropdown', 'tags', 'checkboxes', 'text input', 'image', 'rating', 'date', 'signature', 'file attachment', 'range', 'camera', 'checkbox', 'description'],
        required: true,
      },
      options: {
        type: [{
          value: { type: String, required: true },
          label: { type: String, required: true },
        }],
        default: undefined,
      },
      required: { type: Boolean, default: true },
      multiSelection: { type: Boolean, default: true },
      placeholder: { type: String, default:'' },
      description: { type: String, default:'' },
      inputMask: { type: String, default:'' },
      multiLine: Boolean,
      minLength: Number,
      maxLength: Number,
      lines: Number,
      inputType: {
        type: String,
        enum: ['text', 'email', 'number', 'phone number', 'password'],
      },
      accept: String,
      step: Number,
      defaultSelected: Number,
      minPhotos: Number,
      maxPhotos: Number,
      defaultToday: { type: Boolean, default: false },
      defaultTimestamp: { type: Boolean, default: false },
      showTimeSelect: { type: Boolean, default: false },
      onlyDate: { type: Boolean, default: false },
      onlyTime: { type: Boolean, default: false },
    }],
  }],
}, { timestamps: true });

const FormModel = mongoose.model('Form', formSchema);

module.exports = FormModel;


/*

Component Types :
  Dropdown
    key
    Options : key, Value, label
    Required : True, False
    Placeholder
    Description
    Icon

  Tags
    key
    Icon
    Options : key, label
    Required : True, False
    Placeholder
    Description


  Checkboxes
    key
    Icon
    Options : key, Value, label
    Required : True, False
    Placeholder
    Description

  Multiple Choice
    Key 
    Icon
    Options : key, Value, label
    Required : True, False
    Placeholder
    Description
  
  Radio
    Key
    Icon
    Options : key, Value, label
    Required : True, False
    Placeholder
    Description
  
  Text Input
    key
    Icon
    Required : True, False
    Placeholder
    Description
    inputMask
    Required : True, False
    Multi-line : True, False
    minLength
    maxLength
    Lines, (when Multi-line is select)
    Input type : Text, Email, Number, Phone Number, Password

  Image
    Key
    Icon
    Required : True, False
    Placeholder
    Description

  Rating
    Key
    Icon
    Required : True, False
    Placeholder
    Description

  Date
    Key
    Icon
    Required : True, False
    Placeholder
    Description
    Default to Today ?
    Show Time Select ?
    Only Date?
    Only Time ?
  
  Signature
    Key
    Icon
    Required : True, False
    Placeholder
    Description

  File Attachment
    Key
    Icon
    Required : True, False
    Placeholder
    Description
    Accept files type ( PDF, img...)

  Range
    Key
    Icon
    Required : True, False
    Placeholder
    Description
    minLength
    maxLength
    Step
    Default Selected
  
  Camera
    Key
    Icon
    Required : True, False
    Placeholder
    Description
    Min photos
    Max Photos


    


*/