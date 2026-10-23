// Legal and professional details required by ЗЕТ (чл. 4) and GDPR (чл. 13).
// TODO(client): fill in the real values. Empty fields are simply not shown on the site.
export interface CompanyDetails {
  legalName: string;
  eik: string;
  vatNumber: string;
  registeredAddress: string;
  // Registration in the АГКК register of licensed persons (ЗКИР)
  cadastreLicense: string;
  // КИИП design qualification (ППП), if design services are offered
  kiipRegistration: string;
  responsibleEngineer: string;
  googleBusinessUrl: string;
}

export const company: CompanyDetails = {
  legalName: "",
  eik: "",
  vatNumber: "",
  registeredAddress: "",
  cadastreLicense: "",
  kiipRegistration: "",
  responsibleEngineer: "",
  googleBusinessUrl: "",
};

export function getCompanyLines() {
  return [
    company.legalName,
    company.eik && `ЕИК: ${company.eik}`,
    company.vatNumber && `ДДС №: ${company.vatNumber}`,
    company.registeredAddress && `Адрес на управление: ${company.registeredAddress}`,
    company.cadastreLicense && `Правоспособност (АГКК): ${company.cadastreLicense}`,
    company.kiipRegistration && `КИИП: ${company.kiipRegistration}`,
  ].filter(Boolean) as string[];
}
