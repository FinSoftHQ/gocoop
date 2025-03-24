import PdfPrint from "~/components/Realm/Roles/Shared/PdfPrint.vue"
import PdfPrintstep from "~/components/Realm/Roles/Shared/StepPdfPrint.vue"

const extraPageRoles = {
  print: PdfPrint,
  printstep: PdfPrintstep,
  
}

const extraComponents = {
}

export const ExtraRolesAndComponents = {
  Roles: extraPageRoles,
  Components: extraComponents,
};