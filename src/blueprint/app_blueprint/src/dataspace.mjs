import { createBigDataDefinitionBuilder } from '@finsoft/blueprint';
import * as v from 'valibot';

export const appPlatformBuilder = createBigDataDefinitionBuilder('sample');
const { defineEntities, defineChoices, defineLinkChoices } = appPlatformBuilder;

export const choices = defineChoices({
  categoryStates: {
    prep: 'Preparation',
    active: 'Active',
    inactive: 'Inactive',
  },
  installmentsStates: {
    twelveMonths: '12 งวด',
  },
  purposeStates: {
    option1: 'เพื่อการอันจำเป็น',
    option2: 'จัดหาสิ่งจำเป็นสำหรับครอบครัว',
    option3: 'อุปการะเลี้ยงดูบุคคลในครอบครัว',
    option4: 'ปลดเปลื้องหนี้สิ้นของครัวเรือน',
    option5: 'รักษาพยาบาลบุคคลในครอบครัว',
  },
  transferChannelsStates: {
    online: 'โอน online',
    cheque: 'เช็ค',
  },
  bankAccountStates: {
    bank1: 'กรุงไทย',
  },
  prefixStates: {
    option1: 'นาย',
    option2: 'นาง',
    option3: 'นางสาว',
    option4: 'เด็กชาย',
    option5: 'เด็กหญิง',
    option6: 'ดอกเตอร์',
    option7: 'แพทย์ชาย',
    option8: 'แพทย์หญิง',
  },
  relationshipStates: {
    option1: 'บุตร',
    option2: 'บิดา',
    option3: 'มารดา',
    option4: 'คู่สมรส',
  },
  employmentStates: {
    option1: 'ข้าราชการ/ลูกจ้างประจำ',
    option2: 'ข้าราชการบำนาญ',
    option3: 'พนักงานกระทรวง ลูกจ้างเงินบำรุง',
    option4: 'พนักงานราชการ พนักงานกระทรวง(ตามวุฒิ) ลูกจ้างเงินบำรุง(ตามวุฒิ)',
    option5: 'เจ้าหน้าที่และลูกจ้างสหกรณ์',
  },
  positionStates: {
    governmentOfficer: 'ข้าราชการและลูกจ้างประจำ',
    temporaryEmployee: 'ลูกจ้างชั่วคราว',
    healthMinistryEmployee: 'พนักงานกระทรวงสาธารณสุข',
    cooperativeStaff: 'เจ้าหน้าที่และลูกจ้างสหกรณ์',
    permanentEmployee: 'ลูกจ้างประจำ',
    temporaryEmployeeDuration: 'ลูกจ้างชั่วคราว (ตามระยะเวลา)',
  }
});

const linkChoices = defineLinkChoices({
  categories: 'category',
  products: 'products',
});

export const data = defineEntities({
  category: {
    root: [
      {
        model: 'name',
        label: 'Name',
        spec: v.pipe(v.string(), v.nonEmpty(), v.maxLength(15)),
        component: 'text',
      },
      {
        model: 'createdAt',
        label: 'Date Created',
        spec: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^\d{8}$/, "Invalid format, date should be 'YYYYMMDD'")
          )
        ),
        // spec: v.union([v.optional(v.date()), v.pipe(v.string(), v.transform(dt => new Date(dt)), v.date())]),
        component: 'date',
      },
      {
        model: 'state',
        label: 'State',
        spec: v.pipe(v.string(), v.nonEmpty()),
        component: 'select',
        choices: choices.categoryStates,
      },
    ],
    links: [
      {
        name: 'products',
        component: 'list',
        // link2: '/api/fin-app/products',
        link2: 'products',
        dataLabel: (data) => `${data.name}`,
        query: {
          look4: 'categoryId',
        },
      },
    ],
  },

  product: {
    root: [
      {
        model: 'name',
        label: 'Name',
        spec: {},
        component: 'text',
      },
      {
        model: 'price',
        label: 'Price',
        spec: {},
        component: 'number',
      },
      {
        model: 'description',
        label: 'Description',
        spec: {},
        component: 'text',
      },
      {
        model: 'categoryId',
        label: 'Category',
        spec: {},
        component: 'link2select',
        link: linkChoices.categories,
      },
    ],
    sub: [
      {
        name: 'code',
        component: 'entry',
        fields: [
          {
            model: 'qrCode',
            label: 'QR Code',
            spec: {},
            component: 'text',
          },
          {
            model: 'upcCode',
            label: 'UPC Code',
            spec: {},
            component: 'text',
          },
        ],
      },
    ],
  },

  order: {
    root: [
      {
        model: 'customer',
        label: 'Customer Name',
        spec: {},
        component: 'text',
      },
      {
        model: 'orderDate',
        label: 'Order Date',
        spec: {},
        component: 'date',
      },
    ],
    sub: [
      {
        name: 'orderItems',
        component: 'list',
        fields: [
          {
            model: 'productId',
            label: 'Product',
            spec: {},
            component: 'product',
            choices: 'ref:products',
          },
          {
            model: 'quantity',
            label: 'Quantity',
            spec: {},
            component: 'number',
          },
          {
            model: 'unitPrice',
            label: 'Unit Price',
            spec: {},
            component: 'number',
          },
        ],
      },
    ],
  },

  // loanfast
  loanfast: {
    root: [
      [{
        model: 'prefix',
        label: 'คำนำหน้าชื่อ',
        spec: {},
        component: 'select',
        choices: choices.prefixStates,
      },
      {
        model: 'fname',
        label: 'ชื่อ',
        spec: {},
        component: 'text',
      },
      {
        model: 'lname',
        label: 'สกุล',
        spec: {},
        component: 'text',
      },],
      [{
        model: 'idmember',
        label: 'รหัสสมาชิก',
        spec: {},
        component: 'text',
      },
      {
        model: 'position',
        label: 'ตำแหน่ง',
        spec: {},
        component: 'select',
        choices: choices.employmentStates,
      },
      {
        model: 'bureau',
        label: 'หน่วยงาน',
        spec: {},
        component: 'text',
      },],
      [{
        model: 'department',
        label: 'สังกัด',
        spec: {},
        component: 'text',
      },
      {
        model: 'salary',
        label: 'เงินเดือน',
        spec: {},
        component: 'number',
      },
      {
        model: 'amount',
        label: 'ยอดที่ต้องการกู้ (บาท)',
        spec: {},
        component: 'number',
      },],        
      [{
        model: 'installments',
        label: 'เลือกจำนวนงวด',
        spec: {},
        component: 'number',
        component: 'select',
        choices: choices.installmentsStates,
      },
      {
        model: 'purpose',
        label: 'เพื่อวัตถุประสงค์',
        spec: {},
        component: 'select',
        choices: choices.purposeStates,
      },
      {
        model: 'createdAt',
        label: 'Date Created',
        spec: v.optional(v.pipe(v.string(), v.regex(/^\d{8}$/, "Invalid format, date should be 'YYYYMMDD'"))),
        component: 'date',
      },],
    ],
    sub: [
      {
        name: 'checkLoan',
        component: 'entry',
        fields: [
          {
            model: 'position',
            label: 'ตำแหน่ง',
            spec: {},
            component: 'select',
            choices: choices.employmentStates,
          },
          {
            model: 'salary',
            label: 'เงินเดือน',
            spec: {},
            component: 'number',
          },
          {
            model: 'expense',
            label: 'ค่าใช้จ่าย',
            spec: {},
            component: 'number',
          },
        ],
      },
      {
        name: 'filldata',
        component: 'entry',
        fields: [
          {
            model: 'idmember',
            label: 'รหัสสมาชิก',
            spec: {},
            component: 'text',
          },
          {
            model: 'prefix',
            label: 'คำนำหน้าชื่อ',
            spec: {},
            component: 'select',
            choices: choices.prefixStates,
          },
          {
            model: 'fname',
            label: 'ชื่อ',
            spec: {},
            component: 'text',
          },
          {
            model: 'lname',
            label: 'สกุล',
            spec: {},
            component: 'text',
          },
          {
            model: 'position',
            label: 'ตำแหน่ง',
            spec: {},
            component: 'select',
            choices: choices.employmentStates,
          },
          {
            model: 'bureau',
            label: 'หน่วยงาน',
            spec: {},
            component: 'text',
          },
          {
            model: 'department',
            label: 'สังกัด',
            spec: {},
            component: 'text',
          },
          {
            model: 'salary',
            label: 'เงินเดือน',
            spec: {},
            component: 'number',
          },
          {
            model: 'amount',
            label: 'ยอดที่ต้องการกู้ (บาท)',
            spec: {},
            component: 'number',
          },          
          {
            model: 'installments',
            label: 'เลือกจำนวนงวด',
            spec: {},
            component: 'number',
            component: 'select',
            choices: choices.installmentsStates,
          },
          {
            model: 'purpose',
            label: 'เพื่อวัตถุประสงค์',
            spec: {},
            component: 'select',
            choices: choices.purposeStates,
          },
          {
            model: 'createdAt',
            label: 'Date Created',
            spec: v.optional(v.pipe(v.string(), v.regex(/^\d{8}$/, "Invalid format, date should be 'YYYYMMDD'"))),
            component: 'date',
          },
        ],
      },
    ],
  },

  // newmembership
  newmembership: {
    root: [
      
      [{
        model: 'prefix',
        label: 'คำนำหน้าชื่อ',
        spec: {},
        component: 'select',
        choices: choices.prefixStates,
      },
      {
        model: 'fname',
        label: 'ชื่อ',
        spec: {},
        component: 'text',
      },
      {
        model: 'lname',
        label: 'สกุล',
        spec: {},
        component: 'text',
      },],
      [{
        model: 'birthDate',
        label: 'วัน/เดือน/ปี เกิด',
        spec: {},
        component: 'date',
      },      
      {
        model: 'idCard',
        label: 'เลขบัตรประชาชน',
        spec: {},
        component: 'text',
      },
      {
        model: 'bankAccount',
        label: 'เลขบัญชีธนาคารกรุงไทย',
        spec: {},
        component: 'text',
      },],
      [{
        model: 'phoneNumber',
        label: 'เบอร์โทร',
        spec: {},
        component: 'text',
      },
      {
        model: 'zipCode',
        label: 'รหัสไปรษณีย์',
        spec: {},
        component: 'text',
      },
      {
        model: 'province',
        label: 'จังหวัด',
        spec: {},
        component: 'text',
      },],
      [{
        model: 'district',
        label: 'อำเภอ',
        spec: {},
        component: 'text',
      },
      {
        model: 'parish',
        label: 'ตำบล',
        spec: {},
        component: 'text',
      },
      {
        model: 'road',
        label: 'ถนน',
        spec: {},
        component: 'text',
      },],
      [{
        model: 'alley',
        label: 'ตรอก/ซอย',
        spec: {},
        component: 'text',
      },
      {
        model: 'homeNumber',
        label: 'บ้านเลขที่',
        spec: {},
        component: 'text',
      },
      {
        model: 'village',
        label: 'หมู่ที่',
        spec: {},
        component: 'text',
      },],
      [{
        model: 'jobPosition',
        label: 'ตําแหน่งงาน',
        spec: {},
        component: 'select',
        choices: choices.employmentStates,
        },  
      {
        model: 'department',
        label: 'แผนก',
        spec: {},
        component: 'text',
      },
      {
        model: 'salary',
        label: 'เงินเดือน',
        spec: {},
        component: 'number',
      },],
      [{
        model: 'stockValue',
        label: 'ส่งเงินค่าหุ้นรายเดือนละ',
        spec: {},
        component: 'number',
      },
      {
        model: 'createdAt',
        label: 'เขียนเมื่อวันที่',
        spec: {},
        component: 'date',
      },],
      {
        model: 'beneficiary',
        label: 'เพิ่มผู้รับผลประโยชน์',
        spec: {},
        component: 'link2multisearch',
        link: {
          name: 'member',
          component: 'appendable',
          // { module: 'category', realm: 'list', page: 'root' },
                dataLabel: (data) => `${prefixStates[data.prefixs]} ${data.fname} ${data.lname} ${data.relevant} ${data.phone}`,
                query: (search) => ({ q: search }), // (search) => ({ name: search })
        },
      },
     
    ],
    sub: [
      {
        name: 'beneficiary',
        component: 'entry',
        fields: [
          {
            model: 'categoryId',
            label: 'เพิ่มผู้รับผลประโยชน์',
            spec: {},
            component: 'link2multisearch',
            link: {
              name: 'category',
              component: 'appendable',
              link2: 'category', // { module: 'category', realm: 'list', page: 'root' },
              dataLabel: (data) => `${data.name}`, 
              query: (search) => ({ q: search }), // (search) => ({ name: search })
            },
          },
        ],
      },
      {
        name: 'verify',
        component: 'entry',
        fields: [
          {
            model: 'qrverify',
            label: 'QR Code ยืนยันตัวตน',
            spec: {},
            component: 'text',
          }
        ],
      },
      {
        name: 'salarycheck',
        component: 'entry',
        fields: [
          {
            model: 'position',
            label: 'ตำแหน่ง',
            spec: {},
            component: 'select',
            choices: choices.employmentStates,
          },
          {
            model: 'salary',
            label: 'เงินเดือน',
            spec: {},
            component: 'number',
          }         
        ],
      },
      {
        name: 'deduction',
        component: 'entry',
        fields: [
          {
            model: 'periodNO',
            label: 'หุ้นงวดที่',
            spec: {},
            component: 'number',
          },
          {
            model: 'stock',
            label: 'หุ้น',
            spec: {},
            component: 'number',
          },
          {
            model: 'periodFast',
            label: 'งวดที่',
            spec: {},
            component: 'number',
          },
          {
            model: 'loanFast',
            label: 'เงินต้น ฉ',
            spec: {},
            component: 'number',
          },
          {
            model: 'emergencyFast',
            label: 'ดอกเบี้ย ฉ',
            spec: {},
            component: 'number',
          },
          {
            model: 'periodNOFast',
            label: 'งวดที่สามัญ',
            spec: {},
            component: 'number',
          },          
          {
            model: ' ordinaryPrincipal',
            label: 'เงินต้นสามัญ',
            spec: {},
            component: 'number',
          },
          {
            model: 'ordinaryInterest',
            label: 'ดอกเบี้ยสามัญ',
            spec: {},
            component: 'number',
          },
          {
            model: ' loan',
            label: 'เงินกู้',
            spec: {},
            component: 'number',
          },
          {
            model: 'totalCreditors',
            label: 'รวมที่ต้องชำระ',
            spec: {},
            component: 'number',
          },
          {
            model: 'receiptNumber',
            label: 'เลขใบเสร็จ',
            spec: {},
            component: 'number',
          },         
        ]
      },     
      {
        name: 'deducted',
        component: 'entry',
        fields: [
          {
            model: 'idmember',
            label: 'เลขสมาชิก',
            spec: {},
            component: 'number',
          },
          {
            model: 'fullname',
            label: 'ชื่อ-สกุล',
            spec: {},
            component: 'text',
          },
          {
            model: 'businessfees',
            label: 'ค่าทำเนียม',
            spec: {},
            component: 'number',
          },
          {
            model: 'periodNO',
            label: 'หุ้นงวดที่',
            spec: {},
            component: 'number',
          },
          {
            model: 'stock',
            label: 'หุ้น',
            spec: {},
            component: 'number',
          },
          {
            model: 'periodFast',
            label: 'งวดที่',
            spec: {},
            component: 'number',
          },
          {
            model: 'loanFast',
            label: 'เงินต้น ฉ',
            spec: {},
            component: 'number',
          },
          {
            model: 'emergencyFast',
            label: 'ดอกเบี้ย ฉ',
            spec: {},
            component: 'number',
          },
          {
            model: 'periodNOFast',
            label: 'งวดที่สามัญ',
            spec: {},
            component: 'number',
          },          
          {
            model: ' ordinaryPrincipal',
            label: 'เงินต้นสามัญ',
            spec: {},
            component: 'number',
          },
          {
            model: 'ordinaryInterest',
            label: 'ดอกเบี้ยสามัญ',
            spec: {},
            component: 'number',
          },
          {
            model: ' loan',
            label: 'เงินกู้',
            spec: {},
            component: 'number',
          },
          {
            model: 'surrenderWealth',
            label: 'ยอมทรัพย์',
            spec: {},
            component: 'number',
          },
          {
            model: 'other',
            label: 'อื่นๆ',
            spec: {},
            component: 'number',
          },
          {
            model: 'accumulatedMoney',
            label: 'เงินสะสม',
            spec: {},
            component: 'number',
          },
          {
            model: 'salary',
            label: 'เงินเดือน',
            spec: {},
            component: 'number',
          },
          {
            model: 'totalCreditors',
            label: 'รวมที่ต้องชำระ',
            spec: {},
            component: 'number',
          },
          {
            model: 'receiptNumber',
            label: 'เลขใบเสร็จ',
            spec: {},
            component: 'number',
          },           
        ]
      }      
    ]
  },
  deduction: {
    root: [
      {
        model: 'idmember',
        label: 'เลขสมาชิก',
        spec: {},
        component: 'text',
      },
      {
        model: 'prefix',
        label: 'คำนำหน้าชื่อ',
        spec: {},
        component: 'select',
        choices: choices.prefixStates,
      },
      {
        model: 'fname',
        label: 'ชื่อ',
        spec: {},
        component: 'text',
      },
      {
        model: 'lname',
        label: 'สกุล',
        spec: {},
        component: 'text',
      },
      {
        model: 'businessfees',
        label: 'ค่าทำเนียม',
        spec: {},
        component: 'number',
      },
      {
        model: 'periodNO',
        label: 'หุ้นงวดที่',
        spec: {},
        component: 'text',
      },
      {
        model: 'stock',
        label: 'หุ้น',
        spec: {},
        component: 'number',
      },
      {
        model: 'periodFast',
        label: 'งวดที่',
        spec: {},
        component:'text',
      },
      {
        model: 'loanFast',
        label: 'เงินต้น ฉ',
        spec: {},
        component:'number',
      },
      {
        model: 'emergencyFast',
        label: 'ดอกเบี้ย ฉ',
        spec: {},
        component: 'number',
      },
      {
        model: 'periodNOFast',
        label: 'งวดที่สามัญ',
        spec: {},
        component: 'text',
      },          
      {
        model: 'ordinaryPrincipal',
        label: 'เงินต้นสามัญ',
        spec: {},
        component: 'number',
      },
      {
        model: 'ordinaryInterest',
        label: 'ดอกเบี้ยสามัญ',
        spec: {},
        component: 'number',
      },
      {
        model: 'loan',
        label: 'เงินกู้',
        spec: {},
        component: 'number',
      },
      {
        model: 'surrenderWealth',
        label: 'ยอมทรัพย์',
        spec: {},
        component: 'number',
      },
      {
        model: 'other',
        label: 'อื่นๆ',
        spec: {},
        component: 'number',
      },
      {
        model: 'accumulatedMoney',
        label: 'เงินสะสม',
        spec: {},
        component: 'number',
      },
      {
        model: 'salary',
        label: 'เงินเดือน',
        spec: {},
        component: 'number',
      },
      {
        model: 'totalCreditors',
        label: 'รวมที่ต้องชำระ',
        spec: {},
        component: 'number',
      },
      {
        model: 'receiptNumber',
        label: 'เลขใบเสร็จ',
        spec: {},
        component: 'text',
      },  
    ],
    sub: [
      {
        name: 'editdue',
        component: 'entry',
        fields: [
          {
            model: 'totalCreditors',
            label: 'รวมที่ต้องชำระ',
            spec: {},
            component: 'number',
          },
          {
            model: 'deductible',
            label: 'หักได้',
            spec: {},
            component: 'number',
          }                                
        ]
      },
    ],    
  },
  // counterloanfast
  counterloanfast: {
    root: [[
      {
        model: 'prefix',
        label: 'คำนำหน้าชื่อ',
        spec: {},
        component: 'select',
        choices: choices.prefixStates,
      },
      {
        model: 'fname',
        label: 'ชื่อ',
        spec: {},
        component: 'text',
      },
      {
        model: 'lname',
        label: 'สกุล',
        spec: {},
        component: 'text',
      },],[
      {
        model: 'idmember',
        label: 'รหัสสมาชิก',
        spec: {},
        component: 'text',
      },
      {
        model: 'position',
        label: 'ตำแหน่ง',
        spec: {},
        component: 'select',
        choices: choices.employmentStates,
      },
      {
        model: 'department',
        label: 'สังกัด',
        spec: {},
        component: 'text',
      },],
      {
        model: 'salary',
        label: 'เงินเดือน',
        spec: {},
        component: 'number',
      },
      {
        model: 'amount',
        label: 'ยอดที่ต้องการกู้ (บาท)',
        spec: {},
        component: 'number',
      },          
      {
        model: 'installments',
        label: 'เลือกจำนวนงวด',
        spec: {},
        component: 'number',
        component: 'select',
        choices: choices.installmentsStates,
      },
      {
        model: 'purpose',
        label: 'เพื่อวัตถุประสงค์',
        spec: {},
        component: 'select',
        choices: choices.purposeStates,
      },        
      {
        model: 'createdAt',
        label: 'Date Created',
        spec: v.optional(v.pipe(v.string(), v.regex(/^\d{8}$/, "Invalid format, date should be 'YYYYMMDD'"))),
        component: 'date',
      },
    ],
    sub: [
      {
        name: 'loanfast',
        component: 'entry',
        fields: [
          {
            model: 'amount',
            label: 'ยอดที่ต้องการกู้ (บาท)',
            spec: {},
            component: 'number',
          },          
          {
            model: 'installments',
            label: 'เลือกจำนวนงวด',
            spec: {},
            component: 'number',
            component: 'select',
            choices: choices.installmentsStates,
          },
          {
            model: 'purpose',
            label: 'เพื่อวัตถุประสงค์',
            spec: {},
            component: 'select',
            choices: choices.purposeStates,
          },
                      
        ],
      },
    ],
  },

  // counterregister
  counterregister: {
    root: [
      {
        model: 'fname',
        label: 'Name',
        spec: {},
        component: 'text',
      },]
  },

  //counterverify
  counterverify: {
    root: [
      {
        model: 'memberid',
        label: 'รหัสสมาชิก',
        spec: {},
        component: 'text',
      },
      {
        model: 'photo',
        label: 'รูปถ่ายสมาชิก',
        spec: {},
        component: 'image',
      },
      // {
      //   model: 'signature',
      //   label: 'รายเซ็นชื่อ',
      //   spec: {},
      //   component: 'image',
      // },
    ],
    sub: [
      {
        name: 'beneficiary',
        component: 'entry',
        fields: [
          {
            model: 'prefixs',
            label: 'คำนำหน้าชื่อ',
            spec: {},
            component: 'select',
            choices: choices.prefixStates,
          },
          {
            model: 'fname',
            label: 'ชื่อ',
            spec: {},
            component: 'text',
          },
          {
            model: 'lname',
            label: 'สกุล',
            spec: {},
            component: 'text',
          },
          {
            model: 'phoneNumber',
            label: 'เบอร์โทร',
            spec: {},
            component: 'text',
          },
        ],
      },
      {
        name: 'photo',
        component: 'entry',
        fields: [
          {
            model: 'photo',
            label: 'รูปถ่ายสมาชิก',
            spec: {},
            component: 'image',
          },
        ],
      },
      {
        name: 'signature',
        component: 'entry',
        fields: [
          {
            model: 'signature',
            label: 'รายเซ็นชื่อ',
            spec: {},
            component: 'image',
          },
        ],
      },
      {
        name: 'verify',
        component: 'entry',
        fields: [
          {
            model: 'verify',
            label: 'ยืนยันตัวตน',
            spec: {},
            component: 'text',
          },
        ],
      },
    ],
  },

  // accTransactions
  accTransactions: {
    root: [
      {
        model: 'name',
        label: 'Name',
        spec: {},
        component: 'text',
      },]
  },

  member: {
    root: [
      {
        model: 'prefixs',
        label: 'คำนำหน้าชื่อ',
        spec: {},
        component: 'select',
        choices: choices.prefixStates,
      },
      {
        model: 'fname',
        label: 'ชื่อ',
        spec: {},
        component: 'text',
      },
      {
        model: 'lname',
        label: 'สกุล',
        spec: {},
        component: 'text',
      },
      {
        model: 'relevant',
        label: 'เกี่ยวข้องเป็น',
        spec: {},
        component: 'text',
      },
      {
        model: 'phone',
        label: 'เบอร์โทร',
        spec: {},
        component: 'text',
      },
    ],
    links: [
      {
        name: 'newmembership',
        component: 'list',
        // link2: '/api/fin-app/products',
        link2: 'newmembership',
        dataLabel: (data) => `${data.name}`,
        query: {
          look4: 'beneficiary',
        },
      },
    ],
  },
});
