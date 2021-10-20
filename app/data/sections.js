export default [{
  id: 'about-this-log',
  title: 'About this log',
  paths: (sectionPath) => [
    `${sectionPath}/gdpr`,
    `${sectionPath}/organisation`,
    `${sectionPath}/sale-or-letting`,
    `${sectionPath}/letting-renewal`,
    `${sectionPath}/letting-start-date`,
    `${sectionPath}/letting-type`,
    `${sectionPath}/tenant-code`,
    `${sectionPath}/check-your-answers`,
    `${sectionPath}/sale-completion-date`,
    `${sectionPath}/purchaser-code`,
    `${sectionPath}/check-your-answers`
  ],
  forks: (sectionPath, keyPathRoot) => [{
    currentPath: `${sectionPath}/gdpr`,
    forkPath: `${sectionPath}/cannot-use-this-service`,
    storedData: keyPathRoot.concat('gdpr'),
    values: ['false']
  }, {
    currentPath: `${sectionPath}/sale-or-letting`,
    forkPath: `${sectionPath}/sale-completion-date`,
    storedData: keyPathRoot.concat('sale-or-letting'),
    values: ['sale']
  }]
}, {
  id: 'household-characteristics',
  title: 'Household characteristics',
  group: 'household'
}, {
  id: 'household-situation',
  title: 'Household situation',
  group: 'household',
  paths: (sectionPath) => [
    `${sectionPath}/previous-housing-situation`,
    `${sectionPath}/previous-homelessness`,
    `${sectionPath}/reason-for-leaving`,
    `${sectionPath}/check-your-answers`
  ]
}, {
  id: 'household-needs',
  title: 'Household needs',
  group: 'household'
}, {
  id: 'tenancy-information',
  title: 'Tenancy information',
  group: 'tenancy',
  paths: (sectionPath) => [
    `${sectionPath}/start-date`,
    `${sectionPath}/is-starter`,
    `${sectionPath}/tenancy-type`,
    `${sectionPath}/check-your-answers`
  ]
}, {
  id: 'property-information',
  title: 'Property information',
  group: 'tenancy',
  paths: (sectionPath, log) => {
    const isSupportedHousing = log['about-this-log']['letting-need-type'] === 'supported-housing'
    const isRenewal = log['about-this-log']['letting-renewal'] === 'true'

    switch (true) {
      case (isSupportedHousing && !isRenewal):
        return [
          `${sectionPath}/reference`,
          `${sectionPath}/postcode`,
          // ↳ Local authority if cannot be inferred from postcode
          `${sectionPath}/local-authority-known`,
          `${sectionPath}/local-authority`,
          // ↳ No postcode or local authority known
          `${sectionPath}/why-dont-you-know-postcode-or-la`,
          `${sectionPath}/type-of-unit`,
          `${sectionPath}/type-of-property`,
          `${sectionPath}/is-adapted`,
          `${sectionPath}/number-of-bedrooms`,
          `${sectionPath}/void-date`,
          `${sectionPath}/repairs`,
          `${sectionPath}/times-previously-offered`,
          `${sectionPath}/check-your-answers`
        ]
      case (isSupportedHousing && isRenewal):
        return [
          `${sectionPath}/reference`,
          `${sectionPath}/is-adapted`,
          `${sectionPath}/repairs`,
          `${sectionPath}/times-previously-offered`,
          `${sectionPath}/check-your-answers`
        ]
      case (!isSupportedHousing && !isRenewal):
        return [
          `${sectionPath}/reference`,
          `${sectionPath}/postcode`,
          // ↳ Local authority if cannot be inferred from postcode
          `${sectionPath}/local-authority-known`,
          `${sectionPath}/local-authority`,
          // ↳ No postcode or local authority known
          `${sectionPath}/why-dont-you-know-postcode-or-la`,
          `${sectionPath}/is-relet`,
          `${sectionPath}/recent-relet-type`,
          `${sectionPath}/reason-for-vacancy`,
          `${sectionPath}/is-adapted`,
          `${sectionPath}/type-of-unit`,
          `${sectionPath}/type-of-property`,
          `${sectionPath}/number-of-bedrooms`,
          `${sectionPath}/void-date`,
          `${sectionPath}/repairs`,
          `${sectionPath}/times-previously-offered`,
          `${sectionPath}/check-your-answers`
        ]
      default:
        return [
          `${sectionPath}/reference`,
          `${sectionPath}/is-relet`,
          `${sectionPath}/reason-for-vacancy`,
          `${sectionPath}/is-adapted`,
          `${sectionPath}/void-date`,
          `${sectionPath}/repairs`,
          `${sectionPath}/times-previously-offered`,
          `${sectionPath}/check-your-answers`
        ]
    }
  },
  forks: (sectionPath, keyPathRoot) => [{
    currentPath: `${sectionPath}/postcode`,
    forkPath: `${sectionPath}/is-relet`,
    storedData: keyPathRoot.concat('postcode-known'),
    values: ['true']
  }, {
    currentPath: `${sectionPath}/local-authority-known`,
    forkPath: `${sectionPath}/why-dont-you-know-postcode-or-la`,
    storedData: keyPathRoot.concat('local-authority-known'),
    values: ['false']
  }, {
    currentPath: `${sectionPath}/local-authority`,
    forkPath: `${sectionPath}/is-relet`,
    storedData: keyPathRoot.concat('local-authority-known'),
    values: ['true']
  }, {
    currentPath: `${sectionPath}/is-relet`,
    forkPath: `${sectionPath}/reason-for-vacancy-non-relet`,
    storedData: keyPathRoot.concat('is-relet'),
    values: ['false']
  }, {
    currentPath: `${sectionPath}/reason-for-vacancy`,
    forkPath: `${sectionPath}/reason-for-vacancy-relet`,
    storedData: keyPathRoot.concat('reason-for-vacancy'),
    excludedValues: ['died']
  }, {
    currentPath: `${sectionPath}/reason-for-vacancy-relet`,
    skipTo: `${sectionPath}/is-adapted`
  }, {
    currentPath: `${sectionPath}/reason-for-vacancy-non-relet`,
    skipTo: `${sectionPath}/is-adapted`
  }]
}, {
  id: 'income-and-benefits',
  title: 'Income and benefits',
  group: 'rent'
}, {
  id: 'rent',
  title: 'Rent',
  group: 'rent'
}, {
  id: 'local-authority',
  title: 'Local authority',
  group: 'local-authority'
}, {
  id: 'declaration',
  title: 'Declaration',
  group: 'submission'
}]
