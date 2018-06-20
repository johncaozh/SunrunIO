const serverConfig = {
  requestTimeout: 60000,
  // serverEndPoint: "http://10.11.13.254:3000/",
  serverUploadUrl: "http://10.11.13.254:3000/upload",
  serverDownloadUrl: "http://10.11.13.254:3000/download",
  serverEndPoint: "http://localhost:3000/",
  // serverUploadUrl: "http://localhost:3000/upload",
  // serverDownloadUrl: "http://localhost:3000/download",
  iamLoginRedirectUrl: "https://10.50.0.5:9531/iam/sso/login",
  iamLogoutRedirectUrl: "https://10.50.0.5:9531/iam/sso/logout",
  iamLoginSegment: "iam/login",
  iamLogoutSegment: "iam/logout",
  iamUsersSegment: "iam/users",
  productsSegment: "products",
  versionSegment: "versions",
  docsSegment: "documents",
  faqsSegment: "faqs",
  linksSegment: "links",
  usersSegment: "users",
  platformSegment: "platforms",
  packagesSegment: "packages",
}

const store = {
  productId: "productId",
  symbolList: "symbolList",
  user: "user",
}

const constants = {
  dateFormat: "YYYY-MM-DD",
  presetSides: [{
      value: '服务端',
      label: '服务端'
    },
    {
      value: '客户端',
      label: '客户端'
    },
  ],
  presetOSs: [{
      value: 'Windows',
      label: 'Windows'
    },
    {
      value: 'Android',
      label: 'Android'
    },
    {
      value: 'IOS',
      label: 'IOS'
    },
    {
      value: 'Mac',
      label: 'Mac'
    },
    {
      value: 'Linux',
      label: 'Linux'
    },
    {
      value: 'Centos',
      label: 'Centos'
    },
    {
      value: 'Redhat',
      label: 'Redhat'
    },
    {
      value: 'Ubuntu',
      label: 'Ubuntu'
    },
    {
      value: 'WindowsServer',
      label: 'Windows Server'
    },
    {
      value: 'Web',
      label: '网站'
    },
    {
      value: 'Other',
      label: '其他'
    },
  ]
}

export default {
  serverConfig,
  store,
  constants
}
