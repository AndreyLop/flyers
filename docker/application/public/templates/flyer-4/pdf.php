<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?=$this->option['flyer_name']?></title>
	<style>
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

* {
    box-sizing: border-box;
}
body {
    font-family: Arial, Helvetica, sans-serif;
}

.clearfix {
    clear: both;
}

.images_left {
    width: 36%;
    display: inline-block;
}

.images_right {
    width: 63%;
    float: right;
}

.images_right img {
    width: 100%;
}

.images_left_top {margin-bottom: 4px;}
.images_left_top img {width: 100%; display: block;}
.images_left_middle {width: 100%;margin-bottom: 2px;}
.images_left_middle_left {width: 49%; display: inline-block;}
.images_left_middle_right {width: 49%; float: right; display: block;}
.images_left_bottom img {width: 100%;}


.text {
    background-position: 0 65px;
    background-repeat: no-repeat;
    background-image: url('<?=$this->option['base']?>/templates/img/bottom_bg.png');
    background-size: cover;
    color: #fff;
    position: relative;
    z-index: 1;
    padding-top: 220px;
    margin-top: -190px;
    min-height: 945px;
    padding-bottom: 150px;
}

.text_left {
    display: inline-block;
    width: 55%;
    padding-left: 20px;
}

.text_right {
    width: 41%;
    vertical-align: top;
    margin-top: -40px;
    float: right;
}

.text_price {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 40px;
}

.text_photo_desc {
    margin-bottom: 30px;
}

.photo {
    border-radius: 5px;
    background-color: #fff;
    padding: 5px 5px 5px 5px;
    float: left;
    margin-right: 8px;
}

.photo img {
    display: block;
    border-radius: 5px;
}

.desc {
    font-size: 14px;
    line-height: 14.4px;
}

.text_left_black {
    color: #000;
}

.text_realtor_name {
    font-size: 500px;
    font-size: 16px;
    margin-bottom: 10px;
}

.text_realtor_phone {
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 20px;
}

.text_realtor_email {
    margin-bottom: 5px;
}

.text_porpert_heading {
    color: #eb8d49;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 10px;
}

.text_line {
    width: 90%;
    height: 10px;
    background-repeat: repeat-x;
    background-position: center;
    background-size: contain;
    background-image: url('<?=$this->option['base']?>/templates/img/line.png');
    margin-bottom: 10px;
}

.text_text {
    line-height: 24px;
    font-size: 16px;
    padding-right: 20px;
}


.footer {
    padding: 35px 20px 25px;
    background-color: rgba(35,71,98, 0.5);
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
}

.footer_left {
    width: 45%;
    display: inline-block;
}

.footer_right {
    width: 45%;
    float: right;
}

.footer_right_container {
    float: right;
}

.footer_left_logo {
    float: left;
    margin-right: 10px;
    max-width: 66px;
}

.footer_left_logo img {
    width: 100%;
}

.footer_left_text {
    font-size: 12px;
    line-height: 16px;
}

.footer_left_text_company_name {
    font-weight: 500;
    font-size: 16px;
}


.footer_right_logo {
    display: inline-block;
    max-width: 75px;
}

.footer_right_logo img {
    width: 100%;
}

.footer_right_text {
    display: inline-block;
    margin-right: 10px;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    vertical-align: top;
    max-width: 310px;
}
    </style>
</head>
<body>
    <div class="container">
        <div class="images">
            <div class="images_left">
                <div class="images_left_top">
                    <img src="<?=$this->option['flyer_photo'][1]?>" alt="Image 1">
                </div>
                <div class="images_left_middle">
                    <img class="images_left_middle_left" src="<?=$this->option['flyer_photo'][2]?>" alt="Image 2">
                    <img class="images_left_middle_right" src="<?=$this->option['flyer_photo'][3]?>" alt="Image 3">
                </div>
                <div class="images_left_bottom">
                    <img src="<?=$this->option['flyer_photo'][4]?>" alt="Image 4">
                </div>
            </div><!--
            --><div class="images_right">
                <img src="<?=$this->option['flyer_photo'][0]?>" alt="Main image">
            </div>
        </div>
        <div class="text">
            <div class="text_left">
                <div class="text_price"><? if(!empty($this->option['property_info']['price'])) echo '$'. number_format($this->option['property_info']['price'], 0, '', ',')?></div>
                <div class="text_photo_desc">
                    <div class="photo">
                        <img src="<?=$this->option['flyer_photo'][4]?>" alt="Image 4">
                    </div>
                    <div class="desc"><?=$this->option['realtor_info']['realtorSlogan']?></div>
                    <div class="clearfix"></div>
                </div>
                <div class="text_left_black">
                    <div class="text_realtor_name"><?=$this->option['realtor_info']['realtorName']?></div>
                    <div class="text_realtor_phone"><?=$this->option['realtor_info']['realtorPhone']?></div>
                    <div class="text_realtor_email"><?=$this->option['realtor_info']['realtorEmail']?></div>
                    <div class="text_realtor_site"><?=$this->option['realtor_info']['realtorWebsite']?></div>
                </div>
            </div>
            <div class="text_right">
                <div class="text_porpert_heading"><?=$this->option['extra_info']['headline']?></div>
                <div class="text_line">
                </div>
                <div class="text_text"><?=$this->option['extra_info']['content']?>
						<? if (!empty($this->option['extra_info']['content'])) {
											$this->option['extra_info']['content'] = explode ("\n",$this->option['extra_info']['content']);
											foreach ($this->option['extra_info']['content'] as $key=>$str) {
													  echo '<p>'.$str.'</p>';
											}
										}
									?>
				</div>
            </div>
            <div class="footer">
                <div class="footer_left">
                    <div class="footer_left_logo">
                        <img src="<?=$this->option['company_info']['companyPhotoName']?>" alt="">
                    </div>
                    <div class="footer_left_text">
                        <div class="footer_left_text_company_name"><?=$this->option['company_info']['companyName']?></div>
                        <div><?=$this->option['company_info']['zip']?> <?=$this->option['company_info']['state']?>, <?=$this->option['company_info']['city']?>, <?=$this->option['company_info']['addressLine1']?></div>
                        <div><?=$this->option['company_info']['addressLine2']?></div>
                        <div><?if(!empty($this->option['company_info']['companyPhone'])) echo'(office) '.$this->option['company_info']['companyPhone']?></div>
                        <div><?if(!empty($this->option['company_info']['companyFax'])) echo'(fax) '.$this->option['company_info']['companyFax']?></div>
                    </div>
                </div><!--
                --><div class="footer_right">
                    <div class="footer_right_container">
                        <div class="footer_right_text">
                            <div><?=$this->option['property_info']['zip']?> <?=$this->option['property_info']['addressLine1']?></div>
                            <div><?=$this->option['property_info']['addressLine2']?></div>
                            <div><?if(!empty($this->option['property_info']['mlsNumber'])) echo 'MLS: '.$this->option['property_info']['mlsNumber'];?></div>
                        </div>
                        <div class="footer_right_logo">
                            <img style="width:76px" src="<?=$this->option['qr']?>" alt="QR Code">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<img style="display:none; max-width:600px;" src="<?=$this->option['base']?>/templates/img/bottom_bg.png"/>
<img style="display:none; max-width:600px;" src="<?=$this->option['base']?>/templates/img/line.png"/>
</body>
</html>