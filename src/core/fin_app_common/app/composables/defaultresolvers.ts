import FieldInputText from '../components/Field/Input/Text.vue';
import FieldInputSelect from '../components/Field/Input/Select.vue';
import FieldInputLink2Select from '../components/Field/Input/Link2Select.vue';
import FieldInputLink2MultiSelect from '../components/Field/Input/Link2MultiSelect.vue';
import FieldInputLink2State from '../components/Field/Input/Link2State.vue';
import FieldInputLink2MultiSerachable from '../components/Field/Input/Link2MultiSearchable.vue';
import FieldInputSearchableSelect from '../components/Field/Input/SearchableSelect.vue';
import FieldInputSelectPreText from '../components/Field/Input/SelectPreText.vue';
import FieldInputRadioGroup from '../components/Field/Input/RadioGroup.vue';
import FieldInputNumber from '../components/Field/Input/Number.vue';
import FieldInputTextarea from '../components/Field/Input/Textarea.vue';
import FieldInputDate from '../components/Field/Input/Date.vue';
import FieldInputToggle from '../components/Field/Input/Toggle.vue';
import FieldViewText from '../components/Field/View/Text.vue';
import FieldViewQrCode from '../components/Field/View/QrCode.vue';
import FieldViewSelect from '../components/Field/View/Select.vue';
import FieldViewLink2Select from '../components/Field/View/Link2Select.vue';
import FieldViewLink2MultiSearchable from '../components/Field/View/Link2MultiSearchable.vue';
import FieldViewNumber from '../components/Field/View/Number.vue';
import FieldViewTextarea from '../components/Field/View/Textarea.vue';
import FieldViewDate from '../components/Field/View/Date.vue';
import FieldViewToggle from '../components/Field/View/Toggle.vue';
import FieldViewImage from '../components/Field/View/Image.vue';

const defaultEditResolvers = createComponentResolver(
  {
    text: FieldInputText,
    select: FieldInputSelect,
    pretext: FieldInputSelectPreText,
    link2state: FieldInputLink2State,
    link2select: FieldInputLink2Select,
    link2multi: FieldInputLink2MultiSelect,
    link2multisearch: FieldInputLink2MultiSerachable,
    searchselect: FieldInputSearchableSelect,
    radio: FieldInputRadioGroup,
    number: FieldInputNumber,
    textarea: FieldInputTextarea,
    date: FieldInputDate,
    toggle: FieldInputToggle,
    qr: FieldInputText,
    image: FieldInputText,
    webprint: FieldInputText,
  },
  (_) => FieldInputText
);

const defaultViewResolvers = createComponentResolver(
  {
    text: FieldViewText,
    select: FieldViewSelect,
    // pretext: FieldViewText,
    link2state: FieldInputLink2State,
    link2select: FieldViewLink2Select,
    link2multi: FieldViewLink2Select,
    link2multisearch: FieldViewLink2MultiSearchable,
    searchselect: FieldViewSelect,
    radio: FieldViewSelect,
    number: FieldViewNumber,
    textarea: FieldViewTextarea,
    date: FieldViewDate,
    toggle: FieldViewToggle,
    qr: FieldViewQrCode,
    image: FieldViewImage,
  },
  (_) => FieldViewText
);

export const BuiltInResolvers = (resolver?: EntryComponentResolver) => {
  const editResolvers = resolver
    ? chainComponentResolver(resolver, defaultEditResolvers)
    : defaultEditResolvers;
  const viewResolvers = resolver
    ? chainComponentResolver(resolver, defaultViewResolvers)
    : defaultViewResolvers;

  return {
    Edit: editResolvers,
    View: viewResolvers,
    List: viewResolvers,
  };
};

// export const defaultViewResolvers = createComponentResolver(
//   {
//     text: EViewText,
//     number: EViewNumber,
//     date: EViewDate,
//     select: EViewSelect,
//   },
//   (_) => EViewText,
// );
