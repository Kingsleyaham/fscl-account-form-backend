import { date, object, string, setLocale, mixed, array } from "yup";
import { parse, isDate, differenceInYears } from "date-fns";

const supportedFormat = ["image/jpeg", "image/jpg", "image/png"];

setLocale({
  mixed: {
    // eslint-disable-next-line no-template-curly-in-string
    required: "${path} is required",
  },
});

const corporateAccountSchema = object({
  // corporate Details
  companyName: string().required().label("Company Name"),
  rcNum: string().required().label("RC No"),
  dateOfInc: date()
    .test("dateOfInc", "Invalid Date of Inc", function (value: any) {
      return differenceInYears(new Date(), new Date(value)) <= 100;
    })
    .typeError("Date of Inc must be of type date")
    .max(new Date())
    .required()
    .nullable()
    .label("Date of Inc."),

  tin: string().required().label("TIN"),
  corpAccountNumber: string().required().length(10).label("Corporate Account No"),

  //   contact address
  contactAddress: string().required().label("Contact Address"),
  postalAddress: string().required().label("Postal Address"),
  mobileNumber: string().required().label("Mobile Number"),
  email: string().required().email("Invalid Email address").trim(),

  // Investment Details
  investAddress: string().required().trim().label("Investment Contact Address"),

  investPostalAddress: string().required().trim().label("Investment Postal Address"),

  investMobileNumber: string().required().trim().label("Investment Mobile Number"),

  investEmail: string()
    .required()
    .trim()
    .email("Invalid Investment Email address")
    .label("Investment Email Address"),

  // Bank Account Details
  accountName: string().required().trim().label("Account Name"),
  bankName: string().required().trim().label("Bank Name"),
  accountNumber: string().required().trim().length(10).label("Account Number"),
  accountOpenDate: date()
    .test("accountOpenDate", "Invalid Account Opening Date", function (value: any) {
      return differenceInYears(new Date(), new Date(value)) <= 100;
    })
    .typeError("Account open date must be of type date")
    .max(new Date())
    .required()
    .nullable()
    .label("Account Open Date"),

  bvn: string().required().trim().label("Bvn").length(11, "Invalid Bank Verification No"),

  // Authorized Persons
  authorizedPerson: array().of(
    object().shape({
      name: string().required().trim().min(3, "signatory name too short"),
      address: string().required().trim(),
      mobileNum: string().required().trim(),
      email: string().email("Invalid Email address").required().trim(),
      bvn: string().required().length(11, "Invalid Bank Verification No"),
      identification: string().required().trim(),
      passport: mixed().test(
        "required",
        "Passport Photo is required",
        (value: any) => value.length > 0
      ),
    })
  ),

  // Signatory Mandate
  signatory: array().of(
    object().shape({
      name: string().required().trim().min(3, "signatory name too short"),
      designation: string().required().trim(),
      class: string().required().trim(),
    })
  ),
});

export default corporateAccountSchema;
