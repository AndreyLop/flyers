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

            /*////// MOBILE STYLES //////*/
            @media only screen and (max-width:599px){
                .main-td {background-color: #88add3 !important;}
                .top-left {text-align: center !important; width:100% !important;}
                .top-left_horizontal{width: 100% !important;}
                .top-left_horizontal td {margin: 0 auto !important;}
                .two-images{text-align: center;}
                .top-right {margin: 0 auto 10px !important; float: none !important}
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
                .main-image-container {width: 100% !important;}
                .main-image{height: auto !important; width: 100%;}
                .text-content-container {background-image: none !important; padding-top: 10px !important;}
                .main-text-left{width: 100% !important; float: left; margin-top: 10px;}
                .main-text-right{width: 100% !important; float: right; padding-top: 10px !important;}
                .price{margin-bottom: 10px !important;}
                .footer-left {width: 100% !important; float: left;}
                .footer-left table {margin: 0 auto;}
                .footer-right {width: 100% !important; float: left}
                .footer-right table {margin: 0 auto; float: none !important;}
            }
            /* .text-content-container {background-color: rgba(136,173,211, 0);} */
        </style>
        <!-- If Any Outlook -->
        <!--[if mso ]>
            <style type="text/css">
                .text-content-container {
                    background-color: #88add3;
                    padding-top: 10px !important;
                }
                body {
                    font-family: Arial, Helvetica, sans-serif;
                }
            </style>
        <![endif]-->
    </head>
    <body width="100%">
        
    <table style="font-family: Arial, Helvetica, sans-serif"  cellspacing="0" cellpadding="0" class="wrapper" width="100%">
        <tr>
                
            <td class="main-td" align="center" style="background-color: #FFFFFF;" valign="top">
                <table  cellpadding="0" cellspacing="0" style="max-width: 600px; width:100%;">
                    <tr style="display: block; height: 310px; float:left;">
                        <td class="top-right_parent-td">
                            <table  cellpadding="0" cellspacing="0" style="margin-left: 10px;" align="right" class="top-right">
                                <tr>
                                    <td class="main-image-container" style="display: block; width: 379px; overflow: hidden;">
                                        <img class="main-image" style="display: inline-block; height: 100%;" src="<?=$this->option['flyer_photo'][0]?>" alt="Main image">
                                    </td>
                                </tr>
                            </table> <!--right-main-image-->
                            <table  cellpadding="0" cellspacing="0"  align="left" class="top-left">
                                <tr>
                                    <td>
                                        <table  cellpadding="0" cellspacing="0" style="margin: 0 0 9px 0;" class="top-left_horizontal">
                                            <tr>
                                                <td style="width: 210px; height: 112px; display: block; overflow: hidden; ">
                                                    <img style="display: inline-block; width: 100%;" src="<?=$this->option['flyer_photo'][1]?>" alt="Image 1">
                                                </td>
                                            </tr>
                                        </table> <!--top-image-->
                                        <table style="width: 100%; margin: 0 0 9px 0;"  cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td>
                                                    <table class="two-images" style="width: 100%;"  cellpadding="0" cellspacing="0" align="left">
                                                        <tr>
                                                            <td style="overflow: hidden; max-width: 100px; max-height: 160px; display: inline-block;" valign="top">
                                                                <img style="width: 100%; display: inline-block;" src="<?=$this->option['flyer_photo'][2]?>" alt="Image 2">
                                                            </td>
                                                            <td style="overflow: hidden; max-width: 100px; max-height: 160px; display: inline-block; margin: 0 0 0 10px;" valign="top">
                                                                <img style="width: 100%; display: inline-block;" src="<?=$this->option['flyer_photo'][3]?>" alt="Image 3">
                                                            </td>
                                                        </tr>
                                                    </table> <!--two-middle-images_right-->
                                                </td>
                                            </tr>
                                        </table> <!--two-middle-images-->
                                        <table  cellpadding="0" cellspacing="0" class="top-left_horizontal">
                                            <tr>
                                                <td style="width: 210px; height: 105px; display: block; overflow: hidden;">
                                                    <img style="width: 100%; display: inline-block;" src="<?=$this->option['flyer_photo'][4]?>" alt="Image 4">
                                                </td>
                                            </tr>
                                        </table> <!--right-bottom-image-->
                                    </td>
                                </tr>
                            </table> <!--left-main-image-->
                        </td>
                    </tr>

<img style="display:none; max-width:600px;" src="<?=$this->option['base']?>/templates/img/bottom_bg.png"/>
<img style="display:none; max-width:600px;" src="<?=$this->option['base']?>/templates/img/line.png"/>


                    <tr class="text-content-container" style="background-image: url('<?=$this->option['base']?>/templates/img/bottom_bg.png'); float: left; background-repeat: no-repeat; background-size: cover; background-position: center; display: block; padding-top: 65px; display: block; width: 100%;">
                        <td >
                            <table  cellpadding="0" cellspacing="0" style="width: 100%; display: block;">
                                <tr style="display: block;">
                                    <td class="main-text-right" style="width: 50%; padding-top: 45px; padding-left: 10px;">
                                        <span class="price" style="display: block;color: #ffffff; font-size: 30px; margin-bottom: 40px;"> <? if(!empty($this->option['property_info']['price'])) echo '$'. number_format($this->option['property_info']['price'], 0, '', ',')?></span>
                                        <table style="margin-bottom: 25px;">
                                            <tr>
                                                <td style="width: 100px; display: block; background-color: #ffffff; border-radius: 5px; padding: 5px;">
                                                    <img style="width: 100%; display: block; border-radius: 5px;" src="<?=$this->option['realtor_info']['realtorPhotoName']?>" alt="Realtor image">
                                                </td>
                                                <td valign="top" style="color: #ffffff; font-size: 14px; line-height: 14px; padding: 10px 0px 0px 5px;">
                                                    <?=$this->option['realtor_info']['realtorSlogan']?>
                                                </td>
                                            </tr>
                                        </table>
                                        <table>
                                            <tr>
                                                <td style="display: block; font-size: 16px; margin-bottom: 10px;">
                                                    <?=$this->option['realtor_info']['realtorName']?>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="display: block; font-size: 30px; font-weight: 500; margin-bottom: 10px;">
                                                   <?=$this->option['realtor_info']['realtorPhone']?>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="display: block; font-size: 16px; margin-bottom: 5px;">
                                                    <a href="<?=$this->option['realtor_info']['realtorEmail']?>" style="color: #000000; text-decoration: none;"> <?=$this->option['realtor_info']['realtorEmail']?></a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="display: block; font-size: 16px; margin-bottom: 10px;">
                                                    <a href="<?=$this->option['realtor_info']['realtorWebsite']?>" style="color: #000000; text-decoration: none;"><?=$this->option['realtor_info']['realtorWebsite']?></a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td class="main-text-left" style="width: 45%; padding-left: 15px;" valign="top" align="left">
                                        <span style="display: block; line-height: 24px; color: #eb8d49; font-weight: 600;">
                                            <?=$this->option['extra_info']['headline']?>
                                        </span>
										
                                        <span style="display: block; width: 90%; height: 5px; background-image: url(<?=$this->option['base']?>/templates/img/line.png)"></span>
									<? if (!empty($this->option['extra_info']['content'])) {
											$this->option['extra_info']['content'] = explode ("\n",$this->option['extra_info']['content']);
											foreach ($this->option['extra_info']['content'] as $key=>$str) {
													  echo '<span style="display: block; font-size: 16px; line-height: 24px; color: #ffffff;">'.$str.'</span>';
											}
										}
									?>

                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="padding: 35px 5px 25px 5px; background-color: rgba(35,71,98, 0.5)">
                                        <table style="width: 100%">
                                            <tr>
                                                <td class="footer-left">
                                                    <table>
                                                        <tr>
                                                            <td>
                                                                <img style="display: block; margin-right: 5px; width:66px;" src="<?=$this->option['company_info']['companyPhotoName']?>" alt="Logo">
                                                            </td>
                                                            <td>
                                                                <table>
                                                                    <tr>
                                                                        <td style="line-height: 0;">
                                                                            <span style="color: #ffffff; font-size: 14px; line-height: 13px; font-weight: 500;"><?=$this->option['company_info']['companyName']?></span>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="line-height: 0;">
                                                                            <span style="color: #ffffff; font-size: 14px; line-height: 13px;"><?=$this->option['company_info']['zip']?> <?=$this->option['company_info']['state']?>, <?=$this->option['company_info']['city']?>, <?=$this->option['company_info']['addressLine1']?></span>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="line-height: 0;">
                                                                            <span style="color: #ffffff; font-size: 14px; line-height: 13px;"><?=$this->option['company_info']['addressLine2']?></span>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="line-height: 0;">
                                                                            <span style="color: #ffffff; font-size: 14px; line-height: 13px;"><?if(!empty($this->option['company_info']['companyPhone'])) echo'(office) '.$this->option['company_info']['companyPhone']?></span>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="line-height: 0;">
                                                                            <span style="color: #ffffff; font-size: 14px; line-height: 13px;"><?if(!empty($this->option['company_info']['companyFax'])) echo'(fax) '.$this->option['company_info']['companyFax']?></span>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td class="footer-right">
                                                    <table style="float: right;">
                                                        <tr>
                                                            <td>
                                                                <table>
                                                                    <tr>
                                                                        <td>
                                                                            <span style="color: #ffffff; font-size: 16px; line-height: 24px; font-weight: 500;"><?=$this->option['property_info']['zip']?> <?=$this->option['property_info']['addressLine1']?></span>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <span style="color: #ffffff; font-size: 16px; line-height: 24px; font-weight: 500;"><?=$this->option['property_info']['addressLine2']?></span>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <span style="color: #ffffff; font-size: 16px; line-height: 24px; font-weight: 500;"><?if(!empty($this->option['property_info']['mlsNumber'])) echo 'MLS: '.$this->option['property_info']['mlsNumber'];?></span>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td>
                                                                <img style="display: block; margin-left: 5px; width:76px" src="<?=$this->option['qr']?>" alt="QR Code">
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table> <!--text-content-container-->
                        </td>
                    </tr>                    
                </table> <!--main-content-top-->
            </td>
        </tr>
    </table>
    </body>
</html>