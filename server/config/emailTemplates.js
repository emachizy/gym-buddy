export const EMAIL_VERIFY_TEMPLATE = (
  otp // The OTP will be passed as a parameter here
) => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Verify your email address</title>
  <style type="text/css" rel="stylesheet" media="all">
    /* Base ------------------------------ */
    *:not(br):not(tr):not(html) {
      font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    body {
      width: 100% !important;
      height: 100%;
      margin: 0;
      line-height: 1.4;
      background-color: #F5F7F9;
      color: #839197;
      -webkit-text-size-adjust: none;
    }
    a {
      color: #414EF9;
    }

    /* Layout ------------------------------ */
    .email-wrapper {
      width: 100%;
      margin: 0;
      padding: 0;
      background-color: #F5F7F9;
    }
    .email-content {
      width: 100%;
      margin: 0;
      padding: 0;
    }

    /* Masthead ----------------------- */
    .email-masthead {
      padding: 25px 0;
      text-align: center;
    }
    .email-masthead_logo {
      max-width: 400px;
      border: 0;
    }
    .email-masthead_name {
      font-size: 16px;
      font-weight: bold;
      color: #839197;
      text-decoration: none;
      text-shadow: 0 1px 0 white;
    }

    /* Body ------------------------------ */
    .email-body {
      width: 100%;
      margin: 0;
      padding: 0;
      border-top: 1px solid #E7EAEC;
      border-bottom: 1px solid #E7EAEC;
      background-color: #FFFFFF;
    }
    .email-body_inner {
      width: 570px;
      margin: 0 auto;
      padding: 0;
    }
    .email-footer {
      width: 570px;
      margin: 0 auto;
      padding: 0;
      text-align: center;
    }
    .email-footer p {
      color: #839197;
    }
    .body-action {
      width: 100%;
      margin: 30px auto;
      padding: 0;
      text-align: center;
    }
    .body-sub {
      margin-top: 25px;
      padding-top: 25px;
      border-top: 1px solid #E7EAEC;
    }
    .content-cell {
      padding: 35px;
    }
    .align-right {
      text-align: right;
    }

    /* Type ------------------------------ */
    h1 {
      margin-top: 0;
      color: #292E31;
      font-size: 19px;
      font-weight: bold;
      text-align: left;
    }
    h2 {
      margin-top: 0;
      color: #292E31;
      font-size: 16px;
      font-weight: bold;
      text-align: left;
    }
    h3 {
      margin-top: 0;
      color: #292E31;
      font-size: 14px;
      font-weight: bold;
      text-align: left;
    }
    p {
      margin-top: 0;
      color: #839197;
      font-size: 16px;
      line-height: 1.5em;
      text-align: left;
    }
    p.sub {
      font-size: 12px;
    }
    p.center {
      text-align: center;
    }

    /* Buttons ------------------------------ */
    .button {
      display: inline-block;
      width: 200px;
      background-color: #414EF9;
      border-radius: 3px;
      color: #ffffff;
      font-size: 15px;
      line-height: 45px;
      text-align: center;
      text-decoration: none;
      -webkit-text-size-adjust: none;
      mso-hide: all;
    }
    .button--green {
      background-color: #28DB67;
    }
    .button--red {
      background-color: #FF3665;
    }
    .button--blue {
      background-color: #414EF9;
    }

    /* OTP specific styles */
    .otp-code {
      display: inline-block;
      padding: 10px 20px;
      margin: 20px 0;
      background-color: #f0f0f0;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 24px;
      font-weight: bold;
      color: #292E31;
      letter-spacing: 5px;
      text-align: center;
    }


    /*Media Queries ------------------------------ */
    @media only screen and (max-width: 600px) {
      .email-body_inner,
      .email-footer {
        width: 100% !important;
      }
    }
    @media only screen and (max-width: 500px) {
      .button {
        width: 100% !important;
      }
    }
  </style>
</head>
<body>
  <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table class="email-content" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td class="email-masthead">
              <a class="email-masthead_name">Canvas</a>
            </td>
          </tr>
          <tr>
            <td class="email-body" width="100%">
              <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="content-cell">
                    <h1>Verify your email address</h1>
                    <p>Thanks for signing up for Canvas! Please use the following code to verify your email address:</p>
                    <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center">
                          <div class="otp-code">
                            ${otp}
                          </div>
                        </td>
                      </tr>
                    </table>
                    <p>This code is valid for a limited time. Please enter it on the verification page to complete your registration.</p>
                    <p>Thanks,<br>The Canvas Team</p>
                    <table class="body-sub">
                      <tr>
                        <td>
                          <p class="sub">If you did not request this verification, please ignore this email.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="content-cell">
                    <p class="sub center">
                      Canvas Labs, Inc.
                      <br>325 9th St, San Francisco, CA 94103
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

export const PASSWORD_RESET_TEMPLATE = `<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title></title>
    <!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]-->
    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
    <!--[if gte mso 9]>
<noscript>
         <xml>
           <o:OfficeDocumentSettings>
           <o:AllowPNG></o:AllowPNG>
           <o:PixelsPerInch>96</o:PixelsPerInch>
           </o:OfficeDocumentSettings>
         </xml>
      </noscript>
<![endif]-->
    <!--[if mso]><xml>
    <w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word">
      <w:DontUseAdvancedTypographyReadingMail/>
    </w:WordDocument>
    </xml><![endif]-->
  </head>
  <body class="body">
    <div dir="ltr" class="es-wrapper-color">
      <!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#fafafa"></v:fill>
			</v:background>
		<![endif]-->
      <table width="100%" cellspacing="0" cellpadding="0" class="es-wrapper">
        <tbody>
          <tr>
            <td valign="top" class="esd-email-paddings">
              <table cellpadding="0" cellspacing="0" align="center" class="es-content esd-header-popover">
                <tbody>
                  <tr>
                    <td align="center" class="es-adaptive esd-stripe">
                      <table width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" class="es-content-body" style="background-color:transparent">
                        <tbody>
                          <tr>
                            <td align="left" class="esd-structure es-p10">
                              <table width="100%" cellspacing="0" cellpadding="0">
                                <tbody>
                                  <tr>
                                    <td width="580" valign="top" align="center" class="esd-container-frame">
                                      <table width="100%" cellspacing="0" cellpadding="0">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="es-infoblock esd-block-text">
                                              <p>
                                                Put your preheader text here. <a href="https://viewstripo.email" target="_blank" class="view">View in browser</a>
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellpadding="0" cellspacing="0" align="center" class="es-header">
                <tbody>
                  <tr>
                    <td align="center" class="es-adaptive esd-stripe">
                      <table width="600" cellspacing="0" cellpadding="0" bgcolor="#3d5ca3" align="center" class="es-header-body" style="background-color:rgb(61, 92, 163)">
                        <tbody>
                          <tr>
                            <td bgcolor="#3d5ca3" align="left" class="esd-structure es-p20t es-p20b es-p20r es-p20l" style="background-color:rgb(61, 92, 163)">
                              <!--[if mso]><table width="560" cellpadding="0" 
                        cellspacing="0"><tr><td width="270" valign="top"><![endif]-->
                              <table cellspacing="0" cellpadding="0" align="left" class="es-left">
                                <tbody>
                                  <tr>
                                    <td width="270" align="left" class="es-m-p20b esd-container-frame">
                                      <table width="100%" cellspacing="0" cellpadding="0">
                                        <tbody>
                                          <tr>
                                            <td align="left" class="esd-block-image es-m-p0l es-m-txt-c" style="font-size:0">
                                              <a href="https://viewstripo.email" target="_blank">
                                                <img src="https://tlr.stripocdn.email/content/guids/CABINET_66498ea076b5d00c6f9553055acdb37a/images/12051527590691841.png" alt="" width="183" style="display:block">
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]></td><td width="20"></td><td width="270" valign="top"><![endif]-->
                              <table cellspacing="0" cellpadding="0" align="right" class="es-right">
                                <tbody>
                                  <tr>
                                    <td width="270" align="left" class="esd-container-frame">
                                      <table width="100%" cellspacing="0" cellpadding="0">
                                        <tbody>
                                          <tr>
                                            <td align="right" class="esd-block-button es-p10t es-m-txt-c">
                                              <span class="es-button-border">
                                                <a href="https://viewstripo.email/" target="_blank" class="es-button">
                                                  Try free class
                                                </a>
                                              </span>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellspacing="0" cellpadding="0" align="center" class="es-content">
                <tbody>
                  <tr>
                    <td bgcolor="#fafafa" align="center" class="esd-stripe" style="background-color:rgb(250, 250, 250)">
                      <table esd-img-prev-src width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" class="es-content-body" style="background-color:rgb(255, 255, 255)">
                        <tbody>
                          <tr>
                            <td esd-img-prev-src="https://fkus.stripocdn.email/content/guids/CABINET_8a8240f4650bd716d3cd69675fe184ca/images/1041555765740937.png" esd-img-prev-position="left top" esd-img-prev-repeat="no-repeat" bgcolor="transparent" align="left" class="esd-structure es-p40t es-p20r es-p20l" style="background-color:transparent;background-position:left top">
                              <table width="100%" cellspacing="0" cellpadding="0">
                                <tbody>
                                  <tr>
                                    <td width="560" valign="top" align="center" class="esd-container-frame">
                                      <table esd-img-prev-src esd-img-prev-position="left top" width="100%" cellspacing="0" cellpadding="0" style="background-position:left top">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-image es-p5t es-p5b" style="font-size:0">
                                              <a target="_blank">
                                                <img src="https://tlr.stripocdn.email/content/guids/CABINET_dd354a98a803b60e2f0411e893c82f56/images/23891556799905703.png" alt="" width="175" style="display:block">
                                              </a>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p15t es-p15b">
                                              <h1 style="color:#333333;font-size:20px">
                                                <strong>FORGOT YOUR </strong>
                                              </h1>
                                              <h1 style="color:#333333;font-size:20px">
                                                <strong>&nbsp;PASSWORD?</strong>
                                              </h1>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="left" class="esd-block-text es-p40r es-p40l">
                                              <p style="text-align:center">
                                                HI,&nbsp;%FIRSTNAME|% %LASTNAME|%
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="left" class="esd-block-text es-p35r es-p40l">
                                              <p style="text-align:center">
                                                There was a request to change your password!
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p25t es-p40r es-p40l">
                                              <p>
                                                If did not make this request, just ignore this email. Otherwise, please click the button below to change your password:
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-button es-p40t es-p40b es-p10r es-p10l">
                                              <span class="es-button-border">
                                                <a href="https://viewstripo.email/" target="_blank" class="es-button">
                                                  RESET PASSWORD
                                                </a>
                                              </span>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td esd-img-prev-src esd-img-prev-position="center center" align="left" class="esd-structure es-p20t es-p10r es-p10l" style="background-position:center center">
                              <!--[if mso]><table width="580" cellpadding="0" cellspacing="0"><tr><td width="199" valign="top"><![endif]-->
                              <table cellspacing="0" cellpadding="0" align="left" class="es-left">
                                <tbody>
                                  <tr>
                                    <td width="199" align="left" class="esd-container-frame">
                                      <table esd-img-prev-src esd-img-prev-position="center center" width="100%" cellspacing="0" cellpadding="0" style="background-position:center center">
                                        <tbody>
                                          <tr>
                                            <td align="right" class="esd-block-text es-p15t">
                                              <p class="es-m-txt-c" style="font-size:16px;color:#666666">
                                                <strong>Follow us:</strong>
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]></td><td width="20"></td><td width="361" valign="top"><![endif]-->
                              <table cellspacing="0" cellpadding="0" align="right" class="es-right">
                                <tbody>
                                  <tr>
                                    <td width="361" align="left" class="esd-container-frame">
                                      <table esd-img-prev-src esd-img-prev-position="center center" width="100%" cellspacing="0" cellpadding="0" style="background-position:center center">
                                        <tbody>
                                          <tr>
                                            <td align="left" class="esd-block-social es-p10t es-p5b es-m-txt-c" style="font-size:0">
                                              <table cellspacing="0" cellpadding="0" class="es-table-not-adapt es-social">
                                                <tbody>
                                                  <tr>
                                                    <td valign="top" align="center" class="es-p10r">
                                                      <a target="_blank" href="">
                                                        <img src="https://tlr.stripocdn.email/content/assets/img/social-icons/rounded-gray/facebook-rounded-gray.png" alt="Fb" title="Facebook" width="32">
                                                      </a>
                                                    </td>
                                                    <td valign="top" align="center" class="es-p10r">
                                                      <a target="_blank" href="">
                                                        <img src="https://localfiles.stripocdn.email/content/assets/img/social-icons/rounded-gray/x-rounded-gray.png" alt="X" title="X" width="32">
                                                      </a>
                                                    </td>
                                                    <td valign="top" align="center" class="es-p10r">
                                                      <a target="_blank" href="">
                                                        <img src="https://tlr.stripocdn.email/content/assets/img/social-icons/rounded-gray/instagram-rounded-gray.png" alt="Ig" title="Instagram" width="32">
                                                      </a>
                                                    </td>
                                                    <td valign="top" align="center" class="es-p10r">
                                                      <a target="_blank" href="">
                                                        <img src="https://tlr.stripocdn.email/content/assets/img/social-icons/rounded-gray/youtube-rounded-gray.png" alt="Yt" title="Youtube" width="32">
                                                      </a>
                                                    </td>
                                                    <td valign="top" align="center" class="es-p10r">
                                                      <a target="_blank" href="">
                                                        <img src="https://tlr.stripocdn.email/content/assets/img/social-icons/rounded-gray/linkedin-rounded-gray.png" alt="In" title="Linkedin" width="32">
                                                      </a>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                          <tr>
                            <td esd-img-prev-src esd-img-prev-position="left top" align="left" class="esd-structure es-p5t es-p20b es-p20r es-p20l" style="background-position:left top">
                              <table width="100%" cellspacing="0" cellpadding="0">
                                <tbody>
                                  <tr>
                                    <td width="560" valign="top" align="center" class="esd-container-frame">
                                      <table width="100%" cellspacing="0" cellpadding="0">
                                        <tbody>
                                          <tr>
                                            <td esd-links-color="#666666" align="center" class="esd-block-text">
                                              <p style="font-size:14px">
                                                Contact us: <a target="_blank" href="tel:123456789" style="font-size:14px;color:#666666">123456789</a> | <a target="_blank" href="mailto:your@mail.com" style="font-size:14px;color:#666666">your@mail.com</a>
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellspacing="0" cellpadding="0" align="center" class="es-footer">
                <tbody>
                  <tr>
                    <td bgcolor="#fafafa" align="center" class="esd-stripe" style="background-color:rgb(250, 250, 250)">
                      <table esd-img-prev-src width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" class="es-footer-body">
                        <tbody>
                          <tr>
                            <td esd-img-prev-src esd-img-prev-position="left top" bgcolor="#0b5394" align="left" class="esd-structure es-p10t es-p30b es-p20r es-p20l" style="background-color:rgb(11, 83, 148);background-position:left top">
                              <table width="100%" cellspacing="0" cellpadding="0">
                                <tbody>
                                  <tr>
                                    <td width="560" valign="top" align="center" class="esd-container-frame">
                                      <table width="100%" cellspacing="0" cellpadding="0">
                                        <tbody>
                                          <tr>
                                            <td align="left" class="esd-block-text es-p5t es-p5b">
                                              <h2 style="font-size:16px;color:#ffffff">
                                                <strong>Have quastions?</strong>
                                              </h2>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td esd-links-underline="none" esd-links-color="#ffffff" align="left" class="esd-block-text es-p5b">
                                              <p style="font-size:14px;color:#ffffff">
                                                We are here to help, learn more about us <a target="_blank" style="font-size:14px;color:#ffffff;text-decoration:none">here</a>
                                              </p>
                                              <p style="font-size:14px;color:#ffffff">
                                                or <a target="_blank" style="font-size:14px;text-decoration:none;color:#ffffff">contact us</a><br>
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellspacing="0" cellpadding="0" align="center" class="es-content">
                <tbody>
                  <tr>
                    <td bgcolor="#fafafa" align="center" class="esd-stripe" style="background-color:rgb(250, 250, 250)">
                      <table esd-img-prev-src width="600" cellspacing="0" cellpadding="0" bgcolor="transparent" align="center" class="es-content-body" style="background-color:transparent">
                        <tbody>
                          <tr>
                            <td esd-img-prev-src esd-img-prev-position="left top" align="left" class="esd-structure es-p15t" style="background-position:left top">
                              <table width="100%" cellspacing="0" cellpadding="0">
                                <tbody>
                                  <tr>
                                    <td width="600" valign="top" align="center" class="esd-container-frame">
                                      <table width="100%" cellspacing="0" cellpadding="0">
                                        <tbody>
                                          <tr>
                                            <td class="esd-block-menu">
                                              <table width="100%" cellspacing="0" cellpadding="0" class="es-menu">
                                                <tbody>
                                                  <tr>
                                                    <td id="esd-menu-id-0" width="33.33%" valign="top" bgcolor="transparent" align="center" class="es-p10t es-p10b es-p5r es-p5l esd-block-menu-item" style="padding-bottom:1px;padding-top:0px">
                                                      <div>
                                                        <a target="_blank" href="https://viewstripo.email" style="color:#3D5CA3;font-size:14px">
                                                          Sing up
                                                        </a>
                                                      </div>
                                                    </td>
                                                    <td id="esd-menu-id-1" esdev-border-color="#3d5ca3" esdev-border-style="solid" width="33.33%" valign="top" bgcolor="transparent" align="center" class="es-p10t es-p10b es-p5r es-p5l esd-block-menu-item" style="border-left:1px solid #3d5ca3;padding-bottom:1px;padding-top:0px">
                                                      <div>
                                                        <a target="_blank" href="https://viewstripo.email" style="color:#3D5CA3;font-size:14px">
                                                          Blog
                                                        </a>
                                                      </div>
                                                    </td>
                                                    <td id="esd-menu-id-2" esdev-border-color="#3d5ca3" esdev-border-style="solid" width="33.33%" valign="top" bgcolor="transparent" align="center" class="es-p10t es-p10b es-p5r es-p5l esd-block-menu-item" style="border-left:1px solid #3d5ca3;padding-bottom:1px;padding-top:0px">
                                                      <div>
                                                        <a target="_blank" href="https://viewstripo.email" style="color:#3D5CA3;font-size:14px">
                                                          About us
                                                        </a>
                                                      </div>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-spacer es-p20b es-p20r es-p20l" style="font-size:0">
                                              <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0">
                                                <tbody>
                                                  <tr>
                                                    <td style="border-bottom: 1px solid rgb(250, 250, 250); background: none; height: 0px; width: 100%; margin: 0px"></td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellspacing="0" cellpadding="0" align="center" class="es-footer">
                <tbody>
                  <tr>
                    <td bgcolor="#fafafa" align="center" class="esd-stripe" style="background-color:rgb(250, 250, 250)">
                      <table esd-img-prev-src width="600" cellspacing="0" cellpadding="0" bgcolor="transparent" align="center" class="es-footer-body" style="background-color:transparent">
                        <tbody>
                          <tr>
                            <td align="left" esd-img-prev-src class="esd-structure es-p15t es-p5b es-p20r es-p20l">
                              <table width="100%" cellspacing="0" cellpadding="0">
                                <tbody>
                                  <tr>
                                    <td width="560" valign="top" align="center" class="esd-container-frame">
                                      <table width="100%" cellspacing="0" cellpadding="0">
                                        <tbody>
                                          <tr>
                                            <td esd-links-underline="underline" align="center" class="esd-block-text">
                                              <p style="font-size:12px;color:#666666">
                                                This daily newsletter was sent to info@name.com from company name because you subscribed. If you would not like to receive this email <a target="_blank" class="unsubscribe" style="font-size:12px;text-decoration:underline">unsubscribe here</a>.
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellspacing="0" cellpadding="0" align="center" class="es-content esd-footer-popover">
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table esd-img-prev-src width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" class="es-content-body" style="background-color:transparent">
                        <tbody>
                          <tr>
                            <td esd-img-prev-src align="left" class="esd-structure es-p30t es-p30b es-p20r es-p20l">
                              <table width="100%" cellspacing="0" cellpadding="0">
                                <tbody>
                                  <tr>
                                    <td width="560" valign="top" align="center" class="esd-container-frame">
                                      <table width="100%" cellspacing="0" cellpadding="0">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-image es-infoblock made_with" style="font-size:0">
                                              <a target="_blank" href="https://viewstripo.email/?utm_source=templates&utm_medium=email&utm_campaign=education&utm_content=trigger_newsletter2">
                                                <img src="https://tlr.stripocdn.email/content/guids/cab_pub_7cbbc409ec990f19c78c75bd1e06f215/images/78411525331495932.png" alt="" width="125" style="display:block">
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>`;
