import {
  choices as specChoices,
  data as _data,
  appPlatformBuilder,
} from './dataspace.mjs';

const { defineAppModules, defineSteps } = appPlatformBuilder;

export const choices = specChoices;
export const data = {
  category: _data.category,
  product: _data.product,
  order: _data.order,
  loanfast: _data.loanfast,
  newmembership: _data.newmembership,
  counterloanfast: _data.counterloanfast,
  counterregister: _data.counterregister,
  counterverify: _data.counterverify,
  accTransactions: _data.accTransactions,
  deduction: _data.deduction,
  countercheque: _data.countercheque,
};

const steps = defineSteps({
  rootconfirm: {
    root: 'กรอกข้อมูล',
    confirm: 'ตรวจสอบข้อมูล',
  },
  loanfastconfirm: {
    root: 'เช็ควงเงินขอกู้',
    requestloan: 'กรอกคำขอกู้',
    confirm: 'ยืนยันข้อมูล',
  },
  newmembershipconfirm: {
    root: 'ข้อมูลส่วนตัว',
    // beneficiary: 'ผู้รับผลประโยชน์',
    confirm: 'ยืนยันข้อมูล',
  },
  stepsverify: {
    photo: 'ถ่ายรูป',
    signature: 'เก็บลายเซนต์',
    qrcode: 'สแกน QR Code ยืนยันตัวตน',
  },
  stepsfillin: {
    fillin: 'กรอกข้อมูล',
    edit: 'กรอกข้อมูลเพิ่มเติม',
    confirmfillin: 'ตรวจสอบข้อมูล',
  },
  stepstakephoto: {
    takephoto: 'บันทึกเอกสาร',
    result: 'ผลการบันทึก',
  },
  editconfirm: ['edit', 'confirm'],
});

export const appModules = defineAppModules({
  category: {
    label: 'Category',
    list: {
      root: data.category,
      closed: data.category,
    },
    create: {
      root: {
        entity: data.category,
        post: true,
        role: 'stepedit',
        steps: steps.rootconfirm,
      },
      confirm: {
        entity: data.category,
        post: true,
        role: 'stepconfirm',
        steps: steps.rootconfirm,
      },
    },
    each: {
      root: {
        entity: data.category,
        actions: ['Edit'],
      },
      edit: {
        entity: data.category,
        post: true,
        role: 'edit',
      },
      close: {
        entity: data.category,
        role: 'confirm',
      },
    },
  },

  products: {
    label: 'Products',
    list: {
      root: data.product,
      closed: data.product,
    },
    create: {
      root: {
        entity: data.product,
        post: true,
      },
    },
    each: {
      root: {
        entity: data.product,
        actions: [
          'Code',
          {
            label: 'Edit',
            to: { page: 'edit' },
          },
        ],
      },
      edit: {
        entity: data.product,
        post: true,
        role: 'edit',
      },
      code: {
        entity: data.product,
        subName: 'code',
      },
      close: {
        entity: data.product,
        role: 'confirm',
      },
    },
  },

  posts: {
    label: 'Category',
    dataPath: 'category',
    icon: 'i-heroicons-arrow-right-circle',
    list: {
      root: data.category,
      closed: data.category,
    },
    create: {
      root: {
        entity: data.category,
        post: '..',
        role: 'stepedit',
      },
      confirm: {
        entity: data.category,
        post: true,
        role: 'stepconfirm',
      },
      steps: {
        entity: data.category,
        role: 'steps',
      },
    },
    each: {
      root: data.category,
      edit: {
        entity: data.category,
        post: '..',
        get: '..',
        role: 'edit',
      },
      close: {
        entity: data.category,
        role: 'confirm',
      },
    },
  },

  // loanfast
  loanfast: {
    label: 'ขอสินเชื่อฉุกเฉิน',
    list: {
      root: data.loanfast,
      closed: data.loanfast,
    },
    create: {
      root: {
        entity: data.loanfast,
        post: true,
        role: 'stepedit',
        subName: 'checkLoan',
        steps: steps.loanfastconfirm,
      },
      requestloan: {
        entity: data.loanfast,
        post: true,
        role: 'stepedit',
        subName: 'filldata',
        steps: steps.loanfastconfirm,
      },
      confirm: {
        entity: data.loanfast,
        post: true,
        role: 'stepconfirm',
        subName: 'filldata',
        steps: steps.loanfastconfirm,
      },
    },
    each: {
      root: {
        entity: data.loanfast,
        subName: 'filldata',
        actions: ['Edit'],
      },
      edit: {
        entity: data.loanfast,
        post: true,
        role: 'edit',
      },
      completed: {
        entity: data.loanfast,
      },
    },
  },

  // newmembership
  newmembership: {
    label: 'Newmembership',
    list: {
      root: data.newmembership,
      closed: data.newmembership,
    },
    create: {
      root: {
        entity: data.newmembership,
        post: true,
        role: 'stepedit',
        steps: steps.newmembershipconfirm,
      },
      // beneficiary: {
      //   entity: data.newmembership,
      //   post: true,
      //   role: 'stepadduser',
      //   subName: 'beneficiary',
      //   steps: steps.newmembershipconfirm,
      // },
      confirm: {
        entity: data.newmembership,
        post: true,
        role: 'stepconfirm',
        steps: steps.newmembershipconfirm,
      },
    },
    each: {
      root: {
        entity: data.newmembership,
        // actions: [{
        //   label: 'ปริ้นเอกสาร',
        //   to: { page: 'print' },
        // },
        // {
        //   label: 'บันทึกเอกสาร',
        //   to: { page: 'takephoto' },
        // },
        // {
        //   label: 'กรอกข้อมูล',
        //   to: { page: 'fillin' },
        // },
        // {
        //   label: 'แก้ไขข้อมูล',
        //   to: { page: 'edit' },
        // },
        // ],
      },
      edit: {
        entity: data.newmembership,
        post: true,
        role: 'edit',
      },
      print: {
        entity: data.counterloanfast,
        post: true,
        role: 'print',
      },
      takephoto: {
        entity: data.counterloanfast,
        post: true,
        role: 'stepmobilephoto',
        steps: steps.stepstakephoto,
      },
      qrcode: {
        entity: data.counterloanfast,
        post: true,
        role: 'qrcode',
      },
      fillin: {
        entity: data.counterloanfast,
        post: true,
        role: 'edit',
        subName: 'loanfast',
      },
      result: {
        entity: data.counterloanfast,
        role: 'result',
        steps: steps.stepstakephoto,
      },
    },
  },

  // lineoa
  lineoa: {
    label: 'LineOA',
    list: {
      root: {
        entity: data.newmembership,
        post: true,
        role: 'menu',
        actions: [
          {
            title: 'ติดต่อสหกรณ์',
            to: { page: 'qrcode' },
            icon: 'i-mdi-qrcode',
          },
          {
            title: 'ยืนยันตัวตน',
            to: { page: 'qrcode' },
            icon: 'i-mdi-account-lock-outline',
          },
          // {
          //   title: 'สมัครสมาชิก',
          //   to: { module: 'newmembership', realm: 'create', page: 'qrcode' },
          //   icon: 'i-mdi-cash-fast',
          // },
          {
            title: 'กู้ฉุกเฉิน',
            to: { module: 'loanfast', realm: 'create', page: 'root' },
            icon: 'i-mdi-cash-fast',
          },
        ],
      },
      service: {
        entity: data.newmembership,
        post: true,
        role: 'menu',
        actions: [
          {
            title: 'ยืนยันสักอย่าง',
            to: { page: 'qrverify' },
            icon: 'i-mdi-qrcode',
          },
        ],
      },
      qrcode: {
        entity: data.newmembership,
        post: true,
      },
      qrverify: {
        entity: data.newmembership,
        post: true,
      },
      success: data.newmembership,
      closed: data.newmembership,
    },
    create: {
      root: {
        entity: data.newmembership,
        post: true,
        role: 'stepedit',
        subName: 'verify',
        steps: steps.rootconfirm,
      },
      confirm: {
        entity: data.newmembership,
        post: true,
        role: 'stepconfirm',
        steps: steps.rootconfirm,
      },
      qrcode: {
        entity: data.newmembership,
        post: true,
      },
    },
    each: {
      root: {
        entity: data.newmembership,
      },
      completed: {
        entity: data.newmembership,
        post: true,
      },
      qrqueue: {
        entity: data.newmembership,
        post: true,
      },
      success: {
        entity: data.newmembership,
        post: true,
      },
      edit: {
        entity: data.newmembership,
        post: true,
        role: 'edit',
      },
      close: {
        entity: data.newmembership,
        role: 'confirm',
      },
    },
  },

  // loanfastdirector
  loanfastdirector: {
    label: 'อนุมัติกู้ฉุกเฉิน',
    list: {
      root: data.loanfast,
      active: data.loanfast,
      completed: data.loanfast,
      closed: data.loanfast,
      printreport: {
        entity: data.register,
        post: true,
        role: 'print',
      },
    },
    create: {
      root: {
        entity: data.loanfast,
        post: true,
      },
      close: {
        entity: data.loanfast,
        role: true,
      },
    },
    each: {
      root: {
        entity: data.loanfast,
        actions: ['printdimple', 'takephoto'],
      },
      printdimple: {
        entity: data.loanfast,
        post: true,
        role: 'print',
      },
      takephoto: {
        entity: data.loanfast,
        post: true,
        role: 'takephoto',
      },
      edit: {
        entity: data.loanfast,
        post: true,
      },
      cancel: {
        entity: data.loanfast,
        role: 'confirm',
      },
    },
  },

  // registerdirector
  registerdirector: {
    dataPath: 'newmembership',
    label: 'อนุมัติสมัครสมาชิกใหม่',
    list: {
      root: data.newmembership,
      active: data.newmembership,
      completed: data.newmembership,
      closed: data.newmembership,
      checkdata: data.newmembership,
      printreport: {
        entity: data.newmembership,
        post: true,
        role: 'print',
      },
    },
    create: {
      root: {
        entity: data.newmembership,
        post: true,
      },
      close: {
        entity: data.loanfastdirector,
        role: true,
      },
    },
    each: {
      root: {
        entity: data.newmembership,
        actions: ['takephoto'],
      },
      takephoto: {
        entity: data.newmembership,
        post: true,
        role: 'takephoto',
      },
      cancel: {
        entity: data.newmembership,
        role: 'confirm',
      },
    },
  },

  // cheques
  cheques: {
    label: 'ออกเช็ค',
    list: {
      root: data.accTransactions,
      active: data.accTransactions,
      deliver: data.accTransactions,
      completed: data.accTransactions,
      closed: data.loanfast,
    },
    create: {
      root: {
        entity: data.accTransactions,
        post: true,
      },
      close: {
        entity: data.accTransactions,
        post: true,
      },
    },
    each: {
      root: {
        entity: data.loanfast,
        actions: ['print', 'takephoto', 'takephoto2'],
      },
      print: {
        entity: data.accTransactions,
        post: true,
        role: 'print',
      },
      takephoto: {
        entity: data.accTransactions,
        post: true,
        role: 'takephoto',
      },
      takephoto2: {
        entity: data.accTransactions,
        post: true,
        role: 'takephoto',
      },
      cancel: {
        entity: data.accTransactions,
        role: 'confirm',
      },
    },
  },

  // accounting
  accounting: {
    list: {
      root: data.accTransactions,
      monthly: data.accTransactions, // รายเดือน
      yearly: data.accTransactions, // รายปี
      printday: {
        entity: data.accTransactions,
        role: 'print',
      },
      printmonth: {
        entity: data.accTransactions,
        role: 'print',
      },
      printyear: {
        entity: data.accTransactions,
        role: 'print',
      },
    },
    create: {
      root: {
        entity: data.accTransactions,
        post: true,
      },
      close: {
        // ส่งรายงานบัญชี (ปิดยอด)
        entity: data.accTransactions,
        post: true,
      },
    },
    each: {
      root: data.accTransactions,
      cancel: {
        entity: data.accTransactions,
        role: 'confirm',
      },
    },
  },

  // counterloanfast
  counterloanfast: {
    label: 'Loanfast',
    dataPath: 'loanfast',
    list: {
      root: data.loanfast,
      closed: data.loanfast,
      complete: data.loanfast,
    },
    create: {
      root: {
        entity: data.counterloanfast,
        post: true,
        role: 'stepedit',
        steps: steps.rootconfirm,
      },
      confirm: {
        entity: data.counterloanfast,
        post: true,
        role: 'stepconfirm',
        steps: steps.rootconfirm,
      },
    },
    each: {
      root: {
        entity: data.counterloanfast,
        actions: [
          {
            label: 'ปริ้นเอกสาร',
            to: { page: 'print' },
          },
          {
            label: 'บันทึกเอกสาร',
            to: { page: 'takephoto' },
          },
          {
            label: 'กรอกข้อมูล',
            to: { page: 'fillin' },
          },
        ],
      },
      edit: {
        entity: data.counterloanfast,
        post: true,
        role: 'edit',
      },
      print: {
        entity: data.counterloanfast,
        post: true,
        role: 'print',
      },
      takephoto: {
        entity: data.counterloanfast,
        post: true,
        role: 'stepscandoc',
        steps: steps.stepstakephoto,
      },
      qrcode: {
        entity: data.counterloanfast,
        post: true,
        role: 'qrcode',
      },
      fillin: {
        entity: data.counterloanfast,
        post: true,
        role: 'edit',
        subName: 'loanfast',
      },
      result: {
        entity: data.counterloanfast,
        role: 'result',
        steps: steps.stepstakephoto,
      },
      close: {
        entity: data.counterloanfast,
        role: 'confirm',
      },
    },
  },

  // counterregister
  counterregister: {
    dataPath: 'newmembership',
    label: 'Register',
    list: {
      root: {
        entity: data.newmembership,
        tabs: [
          {
            label: 'กำลังดำเนินการ',
            to: { page: 'root' },
          },
          {
            label: 'เสร็จสิ้น',
            to: { page: 'complete' },
          },
        ],
      },
      closed: data.newmembership,
      complete: {
        entity: data.newmembership,
        tabs: [
          {
            label: 'กำลังดำเนินการ',
            to: { page: 'root' },
          },
          {
            label: 'เสร็จสิ้น',
            to: { page: 'complete' },
          },
        ],
        actions: [
          {
            label: 'ปิดยอด',
            to: { page: 'closed' },
          },
        ],
      },
    },
    create: {
      root: {
        entity: data.newmembership,
        post: true,
        role: 'stepedit',
        steps: steps.rootconfirm,
      },
      confirm: {
        entity: data.newmembership,
        post: true,
        role: 'stepconfirm',
        steps: steps.rootconfirm,
      },
    },
    each: {
      root: {
        entity: data.newmembership,
        actions: [
          {
            label: 'ยืนยันตัวตน',
            to: { page: 'takephoto' },
          },
          {
            label: 'กรอกข้อมูล',
            to: { page: 'fillin' },
          },
          {
            label: 'ปริ้นเอกสาร',
            to: { page: 'print' },
          },
        ],
      },
      edit: {
        entity: data.newmembership,
        post: true,
        role: 'edit',
      },
      takephoto: {
        entity: data.newmembership,
        post: true,
        role: 'steptakephoto',
        steps: steps.stepsverify,
      },
      signed: {
        entity: data.newmembership,
        post: true,
        role: 'stepsigned',
        steps: steps.stepsverify,
      },
      qrcode: {
        entity: data.newmembership,
        post: true,
        role: 'stepverifyconfirm',
        steps: steps.stepsverify,
      },
      print: {
        entity: data.newmembership,
        post: true,
        role: 'print',
      },
      fillin: {
        entity: data.newmembership,
        post: true,
        role: 'stepedit',
        subName: 'beneficiary',
        steps: steps.stepsfillin,
      },
      confirmfillin: {
        entity: data.newmembership,
        post: true,
        role: 'stepconfirm',
        subName: 'beneficiary',
        steps: steps.stepsfillin,
      },
      close: {
        entity: data.newmembership,
        role: 'confirm',
      },
    },
  },

  // counterverify
  counterverify: {
    label: 'Verify',
    list: {
      root: data.counterverify,
      closed: data.counterverify,
      complete: data.counterverify,
    },
    create: {
      root: {
        entity: data.counterverify,
        post: true,
        role: 'stepedit',
        steps: steps.rootconfirm,
      },
      confirm: {
        entity: data.counterverify,
        post: true,
        role: 'stepconfirm',
        steps: steps.rootconfirm,
      },
    },
    each: {
      root: {
        entity: data.counterverify,
        actions: [
          {
            label: 'ยืนยันตัวตน',
            to: { page: 'photo' },
          },
        ],
      },
      edit: {
        entity: data.counterverify,
        post: true,
        role: 'stepedit',
        steps: steps.stepsfillin,
      },
      photo: {
        entity: data.counterverify,
        post: true,
        role: 'stepmobilephoto',
        steps: steps.stepsverify,
      },
      signature: {
        entity: data.counterverify,
        post: true,
        role: 'stepmobilephoto',
        steps: steps.stepsverify,
      },
      takephoto: {
        entity: data.counterverify,
        post: true,
        role: 'stepmobilephoto',
        subName: 'photo',
      },
      signed: {
        entity: data.counterverify,
        post: true,
        role: 'stepmobilephoto',
        subName: 'signature',
      },
      qrcode: {
        entity: data.counterverify,
        post: true,
        role: 'stepmobileqr',
        steps: steps.stepsverify,
      },
      print: {
        entity: data.counterverify,
        post: true,
        role: 'print',
      },
      fillin: {
        entity: data.counterverify,
        post: true,
        role: 'stepedit',
        subName: 'beneficiary',
        steps: steps.stepsfillin,
      },
      confirmfillin: {
        entity: data.counterverify,
        post: true,
        role: 'stepconfirm',
        subName: 'beneficiary',
        steps: steps.stepsfillin,
      },
      close: {
        entity: data.counterverify,
        role: 'confirm',
      },
    },
  },

  // deduction
  deduction: {
    label: 'deduction',
    dataPath: 'newmembership',
    list: {
      root: data.newmembership,
      closed: data.newmembership,
      complete: data.newmembership,
    },
    create: {
      root: {
        entity: data.newmembership,
        post: true,
        role: 'stepedit',
        steps: steps.rootconfirm,
      },
      confirm: {
        entity: data.deduction,
        post: true,
        role: 'stepconfirm',
        steps: steps.rootconfirm,
      },
    },
    each: {
      root: {
        entity: data.newmembership,
        role: 'infomember',
        actions: [
          {
            label: 'ประวัติ',
            to: { page: 'history' },
          },
        ],
      },
      edit: {
        entity: data.newmembership,
        post: true,
        role: 'stepedit',
      },
      history: {
        entity: data.newmembership,
        post: true,
      },
    },
  },

  // officerapp:
  officerapp: {
    dataPath: 'counterverify',
    label: 'App Officer',
    list: {
      root: data.counterverify,
      closed: data.counterverify,
      complete: data.counterverify,
    },
    create: {
      root: {
        entity: data.counterverify,
        post: true,
        role: 'stepedit',
        steps: steps.rootconfirm,
      },
      confirm: {
        entity: data.counterverify,
        post: true,
        role: 'stepconfirm',
        steps: steps.rootconfirm,
      },
    },
    each: {
      root: {
        entity: data.counterverify,
        actions: ['Photo', 'signature', 'verify'],
      },
      edit: {
        entity: data.counterverify,
        post: true,
        role: 'edit',
      },
      photo: {
        entity: data.counterverify,
        post: true,
        role: 'takephoto',
      },
      takephoto: {
        entity: data.counterverify,
        post: true,
        role: 'takephoto',
        subName: 'photo',
      },
      signature: {
        entity: data.counterverify,
        post: true,
        role: 'takephoto',
      },
      verify: {
        entity: data.counterverify,
        post: true,
        subName: 'verify',
      },
      close: {
        entity: data.counterverify,
        role: 'confirm',
      },
    },
  },

  // เช็คยังไม่ได้ใช้ตอนนี้
  countercheque: {
    label: 'cheque',
    dataPath: 'loanfast',
    list: {
      root: data.loanfast,
      closed: data.loanfast,
      complete: data.loanfast,
    },
    create: {
      root: {
        entity: data.counterloanfast,
        post: true,
        role: 'stepedit',
        steps: steps.rootconfirm,
      },
      confirm: {
        entity: data.counterloanfast,
        post: true,
        role: 'stepconfirm',
        steps: steps.rootconfirm,
      },
    },
    each: {
      root: {
        entity: data.counterloanfast,
        actions: [
          {
            label: 'ปริ้นเช็ค',
            to: { page: 'print' },
          },
          {
            label: 'บันทึกเช็ค',
            to: { page: 'takephoto' },
          },
        ],
      },
      edit: {
        entity: data.countercheque,
        post: true,
        role: 'edit',
      },
      print: {
        entity: data.counterloanfast,
        post: true,
        role: 'print',
      },
      takephoto: {
        entity: data.counterloanfast,
        post: true,
        role: 'stepmobilephoto',
        steps: steps.stepstakephoto,
      },
      qrcode: {
        entity: data.countercheque,
        post: true,
        role: 'qrcode',
      },
      result: {
        entity: data.counterloanfast,
        role: 'result',
        steps: steps.stepstakephoto,
      },
    },
  },

  // การเงิน
  finance: {
    label: 'Finance',
    dataPath: 'loanfast',
    list: {
      root: {
        // คำอนุมัติ
        entity: data.loanfast,
        tabs: [
          {
            label: 'รายการคำอนุมัติ',
            to: { page: 'root' },
          },
          {
            label: 'รายการเตรียมจ่ายเงิน',
            to: { page: 'active' },
          },
          {
            label: 'รายงาน ณ สิ้นวัน',
            to: { page: 'completed' },
          },
        ],
        actions: [
          {
            label: 'รายงานการเงิน',
            to: { page: 'approve' },
          },
        ],
      },
      active: {
        // ทำรายการ
        entity: data.loanfast,
        tabs: [
          {
            label: 'รายการคำอนุมัติ',
            to: { page: 'root' },
          },
          {
            label: 'รายการเตรียมจ่ายเงิน',
            to: { page: 'active' },
          },
          {
            label: 'รายงาน ณ สิ้นวัน',
            to: { page: 'completed' },
          },
        ],
        actions: [
          {
            label: 'โอนเงิน',
            to: { page: 'transfermoney' },
          },
        ],
      },
      completed: {
        // ปิดยอด
        entity: data.loanfast,
        tabs: [
          {
            label: 'รายการคำอนุมัติ',
            to: { page: 'root' },
          },
          {
            label: 'รายการเตรียมจ่ายเงิน',
            to: { page: 'active' },
          },
          {
            label: 'รายงาน ณ สิ้นวัน',
            to: { page: 'completed' },
          },
        ],
        actions: [
          {
            label: 'ปริ้นรายงาน',
            to: { page: 'report' },
          },
          {
            label: 'ส่งเรื่องให้บัญชี',
            to: { page: 'report' },
          },
        ],
      },
      transfermoney: {
        // โอนเงิน
        entity: data.loanfast,
        post: true,
      },
      approve: {
        // ปริ้นเอกสารใบประหน้า
        entity: data.loanfast,
        post: true,
        role: 'webprint',
      },
      report: {
        // ปริ้น รายงานการเงิน
        entity: data.loanfast,
        post: true,
        role: 'print',
      },
    },
    create: {
      root: {
        entity: data.counterloanfast,
        post: true,
      },
    },
    each: {
      root: {
        entity: data.loanfast,
        actions: ['edit'],
      },
      edit: {
        entity: data.loanfast,
        post: true,
      },
      close: {
        entity: data.loanfast,
        post: true,
        role: 'confirm',
      },
    },
  },
});
