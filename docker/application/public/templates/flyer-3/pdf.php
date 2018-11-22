<? //echo '<pre>'; print_r($this->option); echo '</pre>';
 ?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta name="format-detection" content="telephone=no"> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE" />
        <title><?=$this->option['flyer_name']?></title>
        <style>
             /*////// RESET STYLES //////*/
            p{margin:10px 0; padding:0;}
            table{border-collapse:collapse;}
            h1, h2, h3, h4, h5, h6{display:block; margin:0; padding:0;}
            img, a img{border:0; height:auto; outline:none; text-decoration:none;}
            body, #bodyTable, #bodyCell{height:100%; margin:0; padding:0; width:100%;}

            /*////// CLIENT-SPECIFIC STYLES //////*/
            #outlook a{padding:0;} /* Force Outlook 2007 and up to provide a "view in browser" message. */
            img{-ms-interpolation-mode:bicubic;} /* Force IE to smoothly render resized images. */
            table{mso-table-lspace:0pt; mso-table-rspace:0pt;} /* Remove spacing between tables in Outlook Desktop. */
            .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} /* Force Outlook.com to display emails at full width. */
            p, a, li, td, blockquote{mso-line-height-rule:exactly;} /* Force Outlook Desktop to render line heights as theyre originally set. */
            a[href^="tel"], a[href^="sms"]{color:inherit; cursor:default; text-decoration:none;} /* Force mobile devices to inherit declared link styles. */
            p, a, li, td, body, table, blockquote{-ms-text-size-adjust:100%; -webkit-text-size-adjust:100%;} /* Prevent Windows- and Webkit-based platforms from changing declared text sizes. */
            .ExternalClass, .ExternalClass p, .ExternalClass td, .ExternalClass div, .ExternalClass span, .ExternalClass font{line-height:100%;} /* Force Outlook.com to display line heights normally. */
            a[x-apple-data-detectors]{color:inherit !important; text-decoration:none !important; font-size:inherit !important; font-family:inherit !important; font-weight:inherit !important; line-height:inherit !important;} /* Force iOS devices to heed link styles set in CSS. */
            /* End reset */
           

            body {font-family: sans-serif;}

            /*////// MOBILE STYLES //////*/
            @media only screen and (max-width:599px){
                .top-left {text-align: center !important; width:100% !important;}
                .top-left_horizontal{width: 100% !important;}
                .top-left_horizontal td {margin: 0 auto !important;}
                .top-right {width: 310px !important; margin: 0 auto 10px !important; float: none !important}
                .top-right_parent-td {display: block !important;}
                .middle_right {width: 100% !important;}
                .middle_left {width: 100% !important;}
                .remove-padding {padding: 5px !important;}
                .qr-address {width: 100% !important; text-align: center !important;}
                .description {max-height: none !important;}
                .bottom_left {width: 100% !important;}
                .bottom_left table {width: 100% !important;}
                .bottom_left table td{margin: 0 auto !important;}
                .bottom_right {width: 100% !important; text-align: center !important;}
                .bottom_right table {width: 100% !important;}
            }

        </style>
    </head>
    <body style="max-width: 600px; margin: 0 auto;">
    <table border="0" cellspacing="0" cellpadding="0" class="wrapper" width="100%">
        <tr>
            <td align="center" style="background-color: #FFFFFF;" valign="top">
                <table border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; width:100%;">
                    <tr style="margin: 0 0 10px 0; display: block;">
                        <td class="top-right_parent-td">
                            <table border="0" cellpadding="0" cellspacing="0" style="width: 379px; height: 395px; margin-left: 10px;" align="right" class="top-right">
                                <tr>
                                    <td style="background: url(<?=$this->option['flyer_photo'][0]?>); background-repeat: no-repeat; vertical-align: top; height: 100%; display: block;">
                                        <? if(!empty($this->option['property_info']['addressLine1'])) echo '<span style="float: right; display: block; background-color: rgba(255, 255, 255, 0.85); font-size: 30px; font-weight: 500; line-height: 58px; width: 223px; text-align: center;border: 1px solid #454c53;">$ '.$this->option['property_info']['price'].'</span>';?>
                                        <!--[if gte mso 9]>
                                            <img width="370" style="display: inline-block; width: 100%;" src="https://graf.smarto.com.ua/img/house_5.jpg" alt="Main image">
                                        <![endif]-->
                                    </td>
                                </tr>
                            </table> <!--right-main-image-->
                            <table border="0" cellpadding="0" cellspacing="0"  align="left" class="top-left">
                                <tr>
                                    <td>
                                        <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 0 10px 0;" class="top-left_horizontal">
                                            <tr>
                                                <td style="width: 210px; height: 112px; display: block; overflow: hidden; ">
                                                    <img width="210" style="display: block; width: 100%;" src="<?=$this->option['flyer_photo'][1]?>" alt="Image 1">
                                                </td>
                                            </tr>
                                        </table> <!--top-image-->
                                        <table style="width: 100%; margin: 0 0 10px 0;" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td>
                                                    <table style="width: 100%;" border="0" cellpadding="0" cellspacing="0" align="left">
                                                        <tr>
                                                            <td style="overflow: hidden; max-width: 100px; max-height: 160px; display: inline-block;" valign="top">
                                                                <img width="100" style="width: 100%; display: block;" src="<?=$this->option['flyer_photo'][2]?>" alt="Image 2">
                                                            </td>
                                                            <td style="overflow: hidden; max-width: 100px; max-height: 160px; display: inline-block; margin: 0 0 0 10px;" valign="top">
                                                                <img width="100" style="width: 100%; display: block;" src="<?=$this->option['flyer_photo'][3]?>" alt="Image 3">
                                                            </td>
                                                        </tr>
                                                    </table> <!--two-middle-images_right-->
                                                </td>
                                            </tr>
                                        </table> <!--two-middle-images-->
                                        <table border="0" cellpadding="0" cellspacing="0" class="top-left_horizontal">
                                            <tr>
                                                <td style="width: 210px; height: 105px; display: block; overflow: hidden;">
                                                    <img width="210" style="width: 100%; display: block;" src="<?=$this->option['flyer_photo'][4]?>" alt="Image 4">
                                                </td>
                                            </tr>
                                        </table> <!--right-bottom-image-->
                                    </td>
                                </tr>
                            </table> <!--left-main-image-->
                            
                        </td>
                    </tr>
                    <!--[if gte mso 9]>
                        <tr style="height: 10px;"></tr>
                    <![endif]-->
                    <tr style="display: block;">
                        <td style="background-color: #647685;">
                            <table border="0" cellpadding="0" cellspacing="0" style="width: 300px;" valign="top" align="left" class="middle_left">
                                <tr>
                                    <td>
                                        <table border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td>
                                                    <table>
                                                        <tr>
                                                            <td class="remove-padding" style="padding: 40px 0 33px 15px; width: 100%; font-size: 18px; font-weight: 500; color: #ffffff;">
                                                                 <?=$this->option['extra_info']['headline']?>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                        <table class="qr-address" border="0" cellpadding="0" cellspacing="0" style="font-weight: 500;">
                                            <tr>
                                                <td class="remove-padding" style="width: 100px; height: 100px; display: block; overflow: hidden; padding: 18px 0px 0px 60px;"> 
                                                    <img width="100" style="width: 100%; display: block;" src="<?=$this->option['flyer_photo'][5]?>" alt="QR Code">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="remove-padding" style="padding: 10px 0 0 25px; color: #ffffff;">
                                                    <?=$this->option['property_info']['zip']?> <?=$this->option['property_info']['addressLine1']?>
                                                </td>                                                   
                                            </tr>
                                            <tr>
                                                <td class="remove-padding" style="padding: 14px 0 0 25px; color: #ffffff;">
                                                   <?=$this->option['property_info']['addressLine2']?>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="remove-padding" style="padding: 35px 0 0 25px; color: #ffffff;">
                                                    MLS: <?=$this->option['property_info']['mlsNumber']?>
                                                </td>
                                            </tr>
											 <?if (!empty($this->option['property_info']['website'])) {?> 
												 <tr>
													<td class="remove-padding" style="padding: 25px 0 0 25px; color: #ffffff;">
														<?=$this->option['property_info']['website']?>
													</td>
												</tr>
											 <?}?>
											
                                        </table>
                                    </td>
                                </tr>
                            </table> <!--middle content left side-->
                            <table border="0" cellpadding="0" cellspacing="0" style="width: 300px;" valign="top" align="right" class="middle_right">
                                <tr>
                                    <td>
                                        <table border="0" cellpadding="0" cellspacing="0" style="line-height: 24px;">
                                            <tr>
                                                <td style="padding: 40px 40px 20px 40px;">
                                                    <table border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td class="description" style="display: inline-block; color: #ffffff;">
                                                                   <?=$this->option['extra_info']['content']?>
                                                            </td>
                                                        </tr>
                                                       
                                                    </table>
                                                </td>
                                            </tr>
                                        </table> <!--middle content right side-->
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr style="display: block;">
                        <td>
                            <table class="bottom_left" border="0" cellpadding="0" cellspacing="0" align="left" valign="top">
                                <tr>
                                    <td class="remove-padding" style="padding: 27px 26px 19px 45px;">
                                        <table border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="width: 144px; max-height: 150px; overflow: hidden; display: block;">
                                                    <img width="100%" src="<?=$this->option['realtor_info']['realtorPhotoName']?>" alt="Realtor image" >
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <table class="bottom_right" border="0" cellpadding="0" cellspacing="0" style="width: 330px;" align="right" valign="top">
                                <tr>
                                    <td class="remove-padding" style="padding: 27px 30px 19px 34px; border-collapse:initial; line-height: 24px;">
                                        <table border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="font-size: 18px;">
                                                    <?=$this->option['realtor_info']['realtorName']?>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="font-size: 30px;">
                                                    <?=$this->option['realtor_info']['realtorPhone']?>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <?=$this->option['realtor_info']['realtorEmail']?>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <?=$this->option['realtor_info']['realtorWebsite']?>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="font-size: 12px;">
                                                     <?=$this->option['realtor_info']['realtorSlogan']?>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr style="display: block;">
                        <td style="background-color: #647685; width: 600px;">
                            <table border="0" cellpadding="0" cellspacing="0" align="center">
                                <tr>
                                    <td width="40" style="max-height: 52px; overflow: hidden; display: block; padding: 18px 0 0 0;">
                                        <img width="40" style="display: block; width: 100%;" src="<?=$this->option['company_info']['companyPhotoName']?>" alt="Logo">
                                    </td>
                                    <td style="font-size: 12px; padding: 23px 0px 20px 18px; width: 277px;">
                                        <table>
                                            <tr>
                                                <td style="font-weight: 500; color: #ffffff;">
                                                    <?=$this->option['company_info']['companyName']?>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="color: #ffffff;">
                                                     <?=$this->option['company_info']['zip']?> <?=$this->option['company_info']['state']?>, <?=$this->option['company_info']['city']?>, <?=$this->option['company_info']['addressLine1']?>; <?=$this->option['company_info']['addressLine2']?>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="color: #ffffff;">
                                                    (office)  <?=$this->option['company_info']['companyPhone']?>  (fax)  <?=$this->option['company_info']['Fax']?>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                                                
                        </td>
                    </tr>
                </table> <!--main-content-top-->
                
            </td>
        </tr>
    </table>
    </body>
</html>