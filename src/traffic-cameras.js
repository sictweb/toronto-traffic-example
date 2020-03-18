/**
 * Toronto Traffic Camera data:
 * 
 * https://open.toronto.ca/dataset/traffic-cameras/
 * 
 * The dataset includes the following information for each camera:
 * 
 *  - number
 *  - name
 *  - latitude
 *  - longitude
 *  - comparison directions (i.e., looking in these directions)
 *    - North
 *    - East
 *    - South
 *    - West
 *  - camera group (we'll ignore this)
 * 
 * The camera images associated with the dataset can be found at:
 * 
 * http://opendata.toronto.ca/transportation/tmc/rescucameraimages/CameraImages
 * 
 * The camera image file name is created as follows:
 * 
 * loc####.jpg - where #### is the camera number. (i.e. loc1234.jpg)
 * 
 * And the comparison images can be found at:
 * 
 * http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages
 * 
 * The camera comparison image file names are created as follows:
 * 
 * loc####D.jpg - where #### is the camera number and D is the direction
 * For example: loc1234e.jpg and loc1234w.jpg)
 */

function Camera(data) {
  this.number = data.Number;
  this.name = data.Name;
  // Geographic Coords are stored as Strings, we need Number
  this.lat = parseFloat(data.Latitude);
  this.lng = parseFloat(data.Longitude);
  this.directions = {
    d1: data.D1,
    d2: data.D2,
    d3: data.D3,
    d4: data.D4
  };
}

// Build a camera image URL based on the camera's location number, e.g.,
// http://opendata.toronto.ca/transportation/tmc/rescucameraimages/CameraImages/loc8001.jpg
Camera.prototype.getImageUrl = function() {
  let baseUrl = 'http://opendata.toronto.ca/transportation/tmc/rescucameraimages/CameraImages';
  let cameraNumber = this.number;
  return `${baseUrl}/loc${cameraNumber}.jpg`;
};

/**
 * Build an Array of direction data, with image URLs and direction String, e.g.,
[
  {url: "http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001n.jpg", direction: "n"},
  {url: "http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001e.jpg", direction: "e"},
  {url: "http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001s.jpg", direction: "s"},
  {url: "http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001w.jpg", direction: "w"}
]
*/
Camera.prototype.getDirectionImages = function() {
  let directionData = [];
  let directions = this.directions;
  let number = this.number;
  let baseUrl = 'http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages';

  // Loop through all d1, d2, etc direction keys and create data Objects
  ['d1', 'd2', 'd3', 'd4'].forEach(function(key) {
    let direction = directions[key];
    if(direction) {
      directionData.push({
        url: `${baseUrl}/loc${number}${direction}.jpg`,
        direction: direction
      });
    }
  })

  return directionData;
};

trafficCameras = [
  {"Number":"8001","Name":"YORK ST & BREMNER BLVD","Latitude":"43.643079","Longitude":"-79.381407","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8002","Name":"BREMNER BLVD & LOWER SIMCOE ST","Latitude":"43.64222","Longitude":"-79.384068","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8003","Name":"JARVIS ST & FRONT ST E","Latitude":"43.649461","Longitude":"-79.371267","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8004","Name":"UNIVERSITY AVE & FRONT ST W / YORK ST","Latitude":"43.645153","Longitude":"-79.382574","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8005","Name":"FRONT ST W & SIMCOE ST / LOWER SIMCOE ST","Latitude":"43.644685","Longitude":"-79.384861","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8006","Name":"FRONT ST W & JOHN ST / PRIVATE ACCESS","Latitude":"43.643857","Longitude":"-79.388845","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8007","Name":"SPADINA AVE & FRONT ST W","Latitude":"43.64274","Longitude":"-79.393582","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8008","Name":"BATHURST ST & FRONT ST W","Latitude":"43.640887","Longitude":"-79.401324","D1":"n","D2":"e","D3":"s","D4":"","Group":"Arterial"},
  {"Number":"8009","Name":"JARVIS ST & KING ST E","Latitude":"43.650334","Longitude":"-79.371946","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8010","Name":"KING ST E & PARLIAMENT ST","Latitude":"43.652905","Longitude":"-79.363191","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8011","Name":"ADELAIDE ST E & PARLIAMENT ST","Latitude":"43.653489","Longitude":"-79.363441","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8012","Name":"ADELAIDE ST E & CHURCH ST","Latitude":"43.651264","Longitude":"-79.374816","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8013","Name":"BAY ST & ADELAIDE ST W","Latitude":"43.650035","Longitude":"-79.380732","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8014","Name":"UNIVERSITY AVE & ADELAIDE ST W","Latitude":"43.648981","Longitude":"-79.38533","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8015","Name":"ADELAIDE ST W & SIMCOE ST","Latitude":"43.648607","Longitude":"-79.386483","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8016","Name":"RICHMOND ST E & PARLIAMENT ST","Latitude":"43.654698","Longitude":"-79.363957","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8017","Name":"RICHMOND ST E & CHURCH ST","Latitude":"43.65254","Longitude":"-79.375352","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8018","Name":"BAY ST & RICHMOND ST W","Latitude":"43.651168","Longitude":"-79.381413","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8019","Name":"UNIVERSITY AVE & RICHMOND ST W","Latitude":"43.649915","Longitude":"-79.386506","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8020","Name":"SPADINA AVE & RICHMOND ST W","Latitude":"43.647743","Longitude":"-79.396145","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8021","Name":"UNIVERSITY AVE & QUEEN ST W","Latitude":"43.650827","Longitude":"-79.38695","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8022","Name":"UNIVERSITY AVE & QUEEN ST W","Latitude":"43.650785","Longitude":"-79.386268","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8023","Name":"THE QUEENSWAY & COLBORNE LODGE DR","Latitude":"43.639625","Longitude":"-79.459879","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8024","Name":"THE QUEENSWAY & KING ST W / RONCESVALLES AVE","Latitude":"43.63872","Longitude":"-79.445862","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8025","Name":"THE QUEENSWAY & KING ST W / RONCESVALLES AVE","Latitude":"43.638554","Longitude":"-79.446198","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8026","Name":"THE QUEENSWAY & ELLIS AVE","Latitude":"43.637981","Longitude":"-79.466528","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8027","Name":"THE QUEENSWAY & WINDERMERE AVE","Latitude":"43.637355","Longitude":"-79.470262","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8028","Name":"THE QUEENSWAY & ISLINGTON AVE","Latitude":"43.623692","Longitude":"-79.515061","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8030","Name":"KIPLING AVE & THE QUEENSWAY","Latitude":"43.621046","Longitude":"-79.527067","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8031","Name":"JARVIS ST & DUNDAS ST E","Latitude":"43.656931","Longitude":"-79.374631","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8032","Name":"YONGE ST & DUNDAS ST","Latitude":"43.656238","Longitude":"-79.381033","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8033","Name":"UNIVERSITY AVE & DUNDAS ST","Latitude":"43.654694","Longitude":"-79.387978","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8034","Name":"JARVIS ST & CARLTON ST","Latitude":"43.662311","Longitude":"-79.376852","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8035","Name":"CARLTON ST & CHURCH ST","Latitude":"43.661981","Longitude":"-79.379224","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8036","Name":"YONGE ST & COLLEGE ST / CARLTON ST","Latitude":"43.661432","Longitude":"-79.383272","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8037","Name":"BAY ST & COLLEGE ST","Latitude":"43.66092","Longitude":"-79.385692","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8038","Name":"UNIVERSITY AVE & COLLEGE ST","Latitude":"43.659682","Longitude":"-79.390643","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8039","Name":"COLLEGE ST & ST GEORGE ST / BEVERLEY ST","Latitude":"43.658802","Longitude":"-79.395835","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8040","Name":"BLOOR ST W & CASTLE FRANK RD","Latitude":"43.673872","Longitude":"-79.367813","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8041","Name":"BLOOR ST E & TED ROGERS WAY @ 250 BLOOR ST E","Latitude":"43.671684","Longitude":"-79.380499","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8042","Name":"YONGE ST & BLOOR ST","Latitude":"43.670318","Longitude":"-79.386627","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8043","Name":"BAY ST & BLOOR ST W","Latitude":"43.669814","Longitude":"-79.389643","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8044","Name":"BAY ST & BLOOR ST W","Latitude":"43.669755","Longitude":"-79.38969","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8045","Name":"AVENUE RD & BLOOR ST W","Latitude":"43.668539","Longitude":"-79.394216","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8046","Name":"SPADINA AVE & BLOOR ST W","Latitude":"43.666508","Longitude":"-79.403841","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8047","Name":"BATHURST ST & BLOOR ST W","Latitude":"43.665249","Longitude":"-79.41114","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8048","Name":"BATHURST ST & BLOOR ST W","Latitude":"43.665223","Longitude":"-79.411083","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8049","Name":"DUFFERIN ST & BLOOR ST W","Latitude":"43.65988","Longitude":"-79.435548","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8050","Name":"DUFFERIN ST & BLOOR ST W","Latitude":"43.659716","Longitude":"-79.435377","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8051","Name":"JANE ST & BLOOR ST W","Latitude":"43.649366","Longitude":"-79.484629","D1":"n","D2":"e","D3":"","D4":"w","Group":"Arterial"},
  {"Number":"8052","Name":"ISLINGTON AVE & BLOOR ST W","Latitude":"43.644879","Longitude":"-79.523328","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8053","Name":"ISLINGTON AVE & BLOOR ST W","Latitude":"43.64461","Longitude":"-79.523144","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8054","Name":"EGLINTON AVE E & KENNEDY RD","Latitude":"43.732471","Longitude":"-79.267882","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8055","Name":"EGLINTON AVE E & BIRCHMOUNT RD","Latitude":"43.730242","Longitude":"-79.277795","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8056","Name":"EGLINTON AVE E & WARDEN AVE","Latitude":"43.728086","Longitude":"-79.287539","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8057","Name":"EGLINTON AVE E & VICTORIA PARK AVE","Latitude":"43.724492","Longitude":"-79.302444","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8058","Name":"EGLINTON AVE E & SWIFT DR / CREDIT UNION DR","Latitude":"43.726028","Longitude":"-79.318043","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8059","Name":"EGLINTON AVE E & DON MILLS RD","Latitude":"43.720811","Longitude":"-79.338739","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8060","Name":"EGLINTON AVE E & LESLIE ST","Latitude":"43.717021","Longitude":"-79.34985","D1":"n","D2":"e","D3":"","D4":"w","Group":"Arterial"},
  {"Number":"8061","Name":"EGLINTON AVE E & LAIRD DR","Latitude":"43.713404","Longitude":"-79.364546","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8062","Name":"EGLINTON AVE E & BAYVIEW AVE","Latitude":"43.710913","Longitude":"-79.377288","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8063","Name":"EGLINTON AVE & YONGE ST","Latitude":"43.706892","Longitude":"-79.398213","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8064","Name":"EGLINTON AVE W & AVENUE RD","Latitude":"43.704666","Longitude":"-79.408711","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8065","Name":"EGLINTON AVE W & BATHURST ST","Latitude":"43.700948","Longitude":"-79.425344","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8066","Name":"EGLINTON AVE W & CALEDONIA RD","Latitude":"43.693068","Longitude":"-79.462408","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8067","Name":"EGLINTON AVE W & KEELE ST / TRETHEWEY DR","Latitude":"43.690006","Longitude":"-79.475221","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8068","Name":"EGLINTON AVE W & BLACK CREEK DR","Latitude":"43.688544","Longitude":"-79.483135","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8069","Name":"EGLINTON AVE W & JANE ST","Latitude":"43.684204","Longitude":"-79.498916","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8070","Name":"EGLINTON AVE W & DUFFERIN ST","Latitude":"43.695805","Longitude":"-79.450228","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8071","Name":"MORNINGSIDE AVE & MILITARY TRL","Latitude":"43.789419","Longitude":"-79.194211","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8072","Name":"SHOREHAM DR & MURRAY ROSS PKWY / PRIVATE ACCESS","Latitude":"43.771906","Longitude":"-79.513934","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8073","Name":"MORNINGSIDE AVE & 401 C E MORNINGSIDE AVE S RAMP","Latitude":"43.794991","Longitude":"-79.19673","D1":"n","D2":"e","D3":"s","D4":"","Group":"Arterial"},
  {"Number":"8074","Name":"MARKHAM RD & 401 C E MARKHAM RD N RAMP","Latitude":"43.783978","Longitude":"-79.234556","D1":"n","D2":"","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8075","Name":"SHEPPARD AVE E & MARKHAM RD","Latitude":"43.793729","Longitude":"-79.238423","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8076","Name":"MCCOWAN RD & 401 C E MCCOWAN RD RAMP / CONSILIUM PL","Latitude":"43.779657","Longitude":"-79.254468","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8077","Name":"SHEPPARD AVE E & MCCOWAN RD","Latitude":"43.789679","Longitude":"-79.259145","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8078","Name":"KENNEDY RD & ELLESMERE RD","Latitude":"43.766104","Longitude":"-79.280963","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8079","Name":"KENNEDY RD & 401 C E KENNEDY RD RAMP / WILLIAM KITCHEN RD","Latitude":"43.773452","Longitude":"-79.283662","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8080","Name":"SHEPPARD AVE E & KENNEDY RD","Latitude":"43.783032","Longitude":"-79.288356","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8081","Name":"WARDEN AVE & ELLESMERE RD","Latitude":"43.760959","Longitude":"-79.300965","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8082","Name":"SHEPPARD AVE E & WARDEN AVE","Latitude":"43.778623","Longitude":"-79.307622","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8083","Name":"VICTORIA PARK AVE & LAWRENCE AVE E","Latitude":"43.742339","Longitude":"-79.309695","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8084","Name":"VICTORIA PARK AVE & PARKWOODS VILLAGE DR / ELLESMERE RD","Latitude":"43.757699","Longitude":"-79.315196","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8085","Name":"SHEPPARD AVE E & VICTORIA PARK AVE","Latitude":"43.77519","Longitude":"-79.322693","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8086","Name":"VICTORIA PARK AVE & FINCH AVE E","Latitude":"43.793061","Longitude":"-79.331082","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8087","Name":"VICTORIA PARK AVE & STEELES AVE E","Latitude":"43.81558","Longitude":"-79.341053","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8088","Name":"DON MILLS RD & OVERLEA BLVD / GATEWAY BLVD","Latitude":"43.709129","Longitude":"-79.333462","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8089","Name":"DON MILLS RD & O CONNOR DR","Latitude":"43.695628","Longitude":"-79.339825","D1":"n","D2":"e","D3":"","D4":"w","Group":"Arterial"},
  {"Number":"8090","Name":"DON MILLS RD & LAWRENCE AVE E","Latitude":"43.737238","Longitude":"-79.343726","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8091","Name":"DON MILLS RD & YORK MILLS RD","Latitude":"43.755961","Longitude":"-79.347276","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8092","Name":"SHEPPARD AVE E & DON MILLS RD","Latitude":"43.775017","Longitude":"-79.346716","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8093","Name":"DON MILLS RD & FINCH AVE E","Latitude":"43.792762","Longitude":"-79.355052","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8094","Name":"DON MILLS RD & STEELES AVE E","Latitude":"43.81126","Longitude":"-79.361046","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8095","Name":"STEELES AVE E & WOODBINE AVE","Latitude":"43.813704","Longitude":"-79.3488","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8096","Name":"LESLIE ST & YORK MILLS RD","Latitude":"43.753145","Longitude":"-79.360198","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8097","Name":"LESLIE ST & 401 C E LESLIE ST RAMP / LESMILL RD","Latitude":"43.763942","Longitude":"-79.361593","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8098","Name":"SHEPPARD AVE E & LESLIE ST","Latitude":"43.77192","Longitude":"-79.363908","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8099","Name":"BAYVIEW AVE & POTTERY RD / PRIVATE ACCESS @ 620m SOUTH OF - 550 BAYVIEW AVE (EVERGREEN)","Latitude":"43.683184","Longitude":"-79.365852","D1":"n","D2":"","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8100","Name":"BAYVIEW AVE & ROSEDALE VALLEY RD","Latitude":"43.670337","Longitude":"-79.36018","D1":"n","D2":"","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8101","Name":"BAYVIEW AVE & POTTERY RD","Latitude":"43.688161","Longitude":"-79.363523","D1":"n","D2":"","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8102","Name":"SHEPPARD AVE E & BAYVIEW AVE","Latitude":"43.766533","Longitude":"-79.387715","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8103","Name":"YONGE ST & LORD SEATON W YONGE RAMP","Latitude":"43.752455","Longitude":"-79.407811","D1":"n","D2":"e","D3":"s","D4":"","Group":"Arterial"},
  {"Number":"8104","Name":"SHEPPARD AVE & YONGE ST","Latitude":"43.761289","Longitude":"-79.411047","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8105","Name":"BATHURST ST & FORT YORK BLVD","Latitude":"43.638895","Longitude":"-79.400807","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8106","Name":"SHEPPARD AVE W & BATHURST ST","Latitude":"43.755638","Longitude":"-79.438329","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8107","Name":"DUFFERIN ST & FINCH AVE W","Latitude":"43.768907","Longitude":"-79.467182","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8108","Name":"KEELE ST & ST CLAIR AVE W","Latitude":"43.672462","Longitude":"-79.467401","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8109","Name":"KEELE ST & STEELES AVE W","Latitude":"43.781484","Longitude":"-79.494117","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8110","Name":"BLACK CREEK DR & LAWRENCE AVE W","Latitude":"43.704771","Longitude":"-79.494165","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8111","Name":"RATHBURN RD & THE WEST MALL","Latitude":"43.652901","Longitude":"-79.572261","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8112","Name":"RATHBURN RD & RENFORTH DR","Latitude":"43.651369","Longitude":"-79.579205","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8113","Name":"BAY ST & QUEEN ST W","Latitude":"43.651974","Longitude":"-79.381609","D1":"","D2":"","D3":"","D4":"","Group":"Arterial"},
  {"Number":"8114","Name":"BAY ST & QUEEN ST W","Latitude":"43.651957","Longitude":"-79.382305","D1":"","D2":"","D3":"","D4":"","Group":"Arterial"},
  {"Number":"8115","Name":"QUEENS QUAY W & BAY ST / HARBOUR SQ","Latitude":"43.641065","Longitude":"-79.376862","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8116","Name":"BLOOR ST W & KEELE ST / PARKSIDE DR","Latitude":"43.654753","Longitude":"-79.460241","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8117","Name":"BLOOR ST W & KEELE ST / PARKSIDE DR","Latitude":"43.654574","Longitude":"-79.459819","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8118","Name":"STEELES AVE W & DUFFERIN ST","Latitude":"43.787509","Longitude":"-79.469961","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8119","Name":"DUNDAS ST W & THE WEST MALL","Latitude":"43.628121","Longitude":"-79.55949","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8120","Name":"ELLESMERE RD & BIRCHMOUNT RD","Latitude":"43.763226","Longitude":"-79.291565","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8121","Name":"MCCOWAN RD & ELLESMERE RD","Latitude":"43.771928","Longitude":"-79.251611","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8122","Name":"MARKHAM RD & ELLESMERE RD","Latitude":"43.776407","Longitude":"-79.231442","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8123","Name":"BROWNS LINE & EVANS BROWNS LI RAMP","Latitude":"43.609107","Longitude":"-79.548494","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8124","Name":"KIPLING AVE & EVANS AVE","Latitude":"43.616096","Longitude":"-79.524558","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8125","Name":"KEELE ST & 401 C E KEELE ST RAMP","Latitude":"43.72142","Longitude":"-79.480979","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8126","Name":"401 C E BAYVIEW RAMP & 401 C E BAYVIEW RAMP","Latitude":"43.761937","Longitude":"-79.386728","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8127","Name":"VICTORIA PARK AVE & 401 C E VICTORIA PR RAMP","Latitude":"43.766963","Longitude":"-79.31941","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8128","Name":"KEELE ST & SHEPPARD AVE W","Latitude":"43.744733","Longitude":"-79.486148","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8129","Name":"KEELE ST & WILSON AVE","Latitude":"43.726645","Longitude":"-79.481763","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8130","Name":"DUNDAS ST W & KEELE ST","Latitude":"43.665352","Longitude":"-79.464651","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8131","Name":"KING ST W & JAMESON AVE","Latitude":"43.637138","Longitude":"-79.435831","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8132","Name":"KING ST W & DUFFERIN ST","Latitude":"43.638912","Longitude":"-79.427171","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8133","Name":"KING ST W & STRACHAN AVE","Latitude":"43.642191","Longitude":"-79.4119","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8134","Name":"KING ST W & STRACHAN AVE","Latitude":"43.641949","Longitude":"-79.412095","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8135","Name":"KING ST W & BATHURST ST","Latitude":"43.644047","Longitude":"-79.402861","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8136","Name":"KING ST W & BATHURST ST","Latitude":"43.643929","Longitude":"-79.402953","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8137","Name":"SPADINA AVE & KING ST W","Latitude":"43.645361","Longitude":"-79.395231","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8138","Name":"SPADINA AVE & KING ST W","Latitude":"43.645396","Longitude":"-79.394766","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8139","Name":"O CONNOR DR & WOODBINE AVE","Latitude":"43.699942","Longitude":"-79.319131","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8140","Name":"O CONNOR DR & ST CLAIR AVE E","Latitude":"43.705515","Longitude":"-79.312571","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8141","Name":"QUEEN ST W & LANSDOWNE AVE / JAMESON AVE","Latitude":"43.640515","Longitude":"-79.437344","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8142","Name":"QUEEN ST W & DUFFERIN ST","Latitude":"43.642142","Longitude":"-79.428795","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8143","Name":"QUEEN ST W & DUFFERIN ST","Latitude":"43.642098","Longitude":"-79.428682","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8144","Name":"QUEEN ST W & STRACHAN AVE","Latitude":"43.645413","Longitude":"-79.41315","D1":"","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8145","Name":"BATHURST ST & QUEEN ST W","Latitude":"43.64731","Longitude":"-79.404111","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8146","Name":"SPADINA AVE & QUEEN ST W","Latitude":"43.64888","Longitude":"-79.396195","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8147","Name":"UNIVERSITY AVE & KING ST W","Latitude":"43.647555","Longitude":"-79.384974","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8148","Name":"UNIVERSITY AVE & KING ST W","Latitude":"43.647525","Longitude":"-79.384892","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8149","Name":"WILSON AVE & JANE ST","Latitude":"43.720707","Longitude":"-79.508746","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8150","Name":"WILSON AVE & DUFFERIN ST","Latitude":"43.732197","Longitude":"-79.459086","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8151","Name":"BATHURST ST & WILSON AVE","Latitude":"43.737227","Longitude":"-79.434149","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8152","Name":"AVENUE RD & WILSON AVE","Latitude":"43.740077","Longitude":"-79.421493","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8153","Name":"AVENUE RD & WILSON AVE","Latitude":"43.739729","Longitude":"-79.421831","D1":"","D2":"","D3":"","D4":"","Group":"Arterial"},
  {"Number":"8154","Name":"YONGE ST & YORK MILLS RD / WILSON AVE","Latitude":"43.744331","Longitude":"-79.40647","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8155","Name":"BAYVIEW AVE & YORK MILLS RD","Latitude":"43.748245","Longitude":"-79.383967","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8156","Name":"KINGSTON RD & LAWRENCE AVE E","Latitude":"43.767875","Longitude":"-79.189156","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8157","Name":"KINGSTON RD & 401 C E 2A W RAMP","Latitude":"43.79488","Longitude":"-79.152788","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8158","Name":"WARDEN AVE & 401 C W WARDEN AV RAMP","Latitude":"43.771612","Longitude":"-79.304469","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8159","Name":"MOUNT PLEASANT RD & ST CLAIR AVE E","Latitude":"43.690495","Longitude":"-79.383236","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8160","Name":"MOUNT PLEASANT RD & LAWRENCE AVE E","Latitude":"43.726229","Longitude":"-79.397252","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8161","Name":"YONGE ST & ST CLAIR AVE","Latitude":"43.688038","Longitude":"-79.393936","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8162","Name":"YONGE ST & FINCH AVE","Latitude":"43.779557","Longitude":"-79.415668","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8163","Name":"YONGE ST & STEELES AVE","Latitude":"43.797853","Longitude":"-79.420168","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8164","Name":"SPADINA AVE & BREMNER BLVD / FORT YORK BLVD","Latitude":"43.640773","Longitude":"-79.392842","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8165","Name":"SPADINA AVE & DUNDAS ST W","Latitude":"43.652931","Longitude":"-79.397753","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8166","Name":"SPADINA AVE & COLLEGE ST","Latitude":"43.658051","Longitude":"-79.399894","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8167","Name":"BATHURST ST & GLENCAIRN AVE","Latitude":"43.712465","Longitude":"-79.427959","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8168","Name":"BATHURST ST & LAWRENCE AVE W","Latitude":"43.71939","Longitude":"-79.429923","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8169","Name":"PARK LAWN RD & GARDINER E PARK LAWN RD RAMP","Latitude":"43.625652","Longitude":"-79.48605","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8170","Name":"JANE ST & 400 S JANE ST RAMP / JANE ST BLACK CR S RAMP","Latitude":"43.710991","Longitude":"-79.505749","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8171","Name":"WESTON RD & 401 C W WESTON RD RAMP","Latitude":"43.715022","Longitude":"-79.536488","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8172","Name":"ISLINGTON AVE & 401 C W ISLINGTON N RAMP / ALLENBY AVE","Latitude":"43.71134","Longitude":"-79.553512","D1":"","D2":"","D3":"","D4":"","Group":"Arterial"},
  {"Number":"8173","Name":"KIPLING AVE & BLOOR ST W / KIPLING N DUNDAS W RAMP","Latitude":"43.641833","Longitude":"-79.535497","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8174","Name":"HIGHWAY 27 & BELFIELD RD","Latitude":"43.69944","Longitude":"-79.586985","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8175","Name":"STRACHAN AVE & FLEET ST / MANITOBA DR","Latitude":"43.636412","Longitude":"-79.409555","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8176","Name":"EASTERN AVE & CARLAW AVE","Latitude":"43.658526","Longitude":"-79.338926","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8177","Name":"THE QUEENSWAY & PARK LAWN RD","Latitude":"43.629229","Longitude":"-79.490287","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8178","Name":"THE QUEENSWAY & ROYAL YORK RD","Latitude":"43.62639","Longitude":"-79.502879","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8179","Name":"THE QUEENSWAY & 427 C S QUEENSWAY RAMP / SHERWAY GARDENS RD @ SHERWAY PLAZA","Latitude":"43.6152","Longitude":"-79.55278","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8180","Name":"DUNDAS ST W & CLOVERDALE MALL / 427 C N DUNDAS RAMP","Latitude":"43.628944","Longitude":"-79.55475","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8181","Name":"COLLEGE ST & DUFFERIN ST","Latitude":"43.65259","Longitude":"-79.432706","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8182","Name":"DANFORTH AVE & GREENWOOD AVE","Latitude":"43.681396","Longitude":"-79.332174","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8183","Name":"DANFORTH AVE & PAPE AVE","Latitude":"43.678968","Longitude":"-79.345094","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8184","Name":"BLOOR ST E & PARLIAMENT ST","Latitude":"43.671775","Longitude":"-79.371112","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8185","Name":"DUPONT ST & SPADINA RD","Latitude":"43.67479","Longitude":"-79.406867","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8186","Name":"ST CLAIR AVE W & BATHURST ST","Latitude":"43.683284","Longitude":"-79.418448","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8187","Name":"EGLINTON AVE W & MARTIN GROVE RD","Latitude":"43.674273","Longitude":"-79.563225","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8188","Name":"EGLINTON AVE W & 27 401 427 EGLINTON E RAMP","Latitude":"43.673901","Longitude":"-79.567449","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8189","Name":"LAWRENCE AVE E & KENNEDY RD","Latitude":"43.749781","Longitude":"-79.27487","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8190","Name":"LAWRENCE AVE E & WARDEN AVE","Latitude":"43.745558","Longitude":"-79.294579","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8191","Name":"SHEPPARD AVE E & 404 N SHEPPARD AVE RAMP / YORKLAND RD","Latitude":"43.775694","Longitude":"-79.337891","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8192","Name":"FINCH AVE E & 404 S FINCH RAMP","Latitude":"43.794611","Longitude":"-79.345548","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8193","Name":"FINCH AVE W & 400 S FINCH W RAMP","Latitude":"43.753877","Longitude":"-79.532723","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8194","Name":"STEELES AVE E & KENNEDY RD","Latitude":"43.823947","Longitude":"-79.307024","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8195","Name":"STEELES AVE W & BATHURST ST","Latitude":"43.79272","Longitude":"-79.445591","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8196","Name":"STEELES AVE W & NORFINCH DR / 400 N FINCH W RAMP","Latitude":"43.77346","Longitude":"-79.531701","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8197","Name":"STEELES AVE W & WESTON RD","Latitude":"43.770263","Longitude":"-79.546231","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8198","Name":"STEELES AVE W & MARTIN GROVE RD","Latitude":"43.758033","Longitude":"-79.603253","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8199","Name":"YONGE ST & KING ST","Latitude":"43.649257","Longitude":"-79.377798","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8200","Name":"YONGE ST & KING ST","Latitude":"43.649288","Longitude":"-79.377856","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8201","Name":"QUEEN ST E & WOODBINE AVE","Latitude":"43.668726","Longitude":"-79.305612","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8202","Name":"QUEEN ST E & WOODBINE AVE","Latitude":"43.668661","Longitude":"-79.305909","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8203","Name":"QUEEN ST & KINGSTON RD / EASTERN AVE","Latitude":"43.667064","Longitude":"-79.312827","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8204","Name":"QUEEN ST E & LESLIE ST","Latitude":"43.663232","Longitude":"-79.329999","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8205","Name":"QUEEN ST E & BROADVIEW AVE","Latitude":"43.658769","Longitude":"-79.350004","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8206","Name":"QUEEN ST E & BROADVIEW AVE","Latitude":"43.658728","Longitude":"-79.349874","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8207","Name":"KINGSTON RD & WOODBINE AVE","Latitude":"43.673956","Longitude":"-79.307763","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8208","Name":"KINGSTON RD & WOODBINE AVE","Latitude":"43.673747","Longitude":"-79.307939","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8209","Name":"DUNDAS ST E & JONES AVE","Latitude":"43.666236","Longitude":"-79.334488","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8210","Name":"BROADVIEW AVE & DUNDAS ST E","Latitude":"43.662420","Longitude":"-79.351149","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8211","Name":"BROADVIEW AVE & DUNDAS ST E","Latitude":"43.662566","Longitude":"-79.351316","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8212","Name":"DUNDAS ST E & PARLIAMENT ST","Latitude":"43.659463","Longitude":"-79.366158","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8213","Name":"DUNDAS ST E & PARLIAMENT ST","Latitude":"43.659319","Longitude":"-79.366096","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8214","Name":"DANFORTH AVE & WOODBINE AVE","Latitude":"43.685653","Longitude":"-79.312566","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8215","Name":"DANFORTH AVE & BROADVIEW AVE","Latitude":"43.676244","Longitude":"-79.359156","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"8216","Name":"DANFORTH AVE & BROADVIEW AVE","Latitude":"43.676290","Longitude":"-79.359061","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Arterial"},
  {"Number":"9100","Name":"DON VALLEY PARKWAY & EASTERN AVE","Latitude":"43.656847","Longitude":"-79.352412","D1":"n","D2":"e","D3":"s","D4":"w","Group":"DVP"},
  {"Number":"9101","Name":"DON VALLEY PARKWAY & DUNDAS ST E","Latitude":"43.661899","Longitude":"-79.354748","D1":"n","D2":"e","D3":"s","D4":"w","Group":"DVP"},
  {"Number":"9102","Name":"DON VALLEY PARKWAY & PRINCE EDWARD VIADUCT / DANFORTH AVE @ 470m SOUTH OF","Latitude":"43.671938","Longitude":"-79.358988","D1":"n","D2":"","D3":"s","D4":"","Group":"DVP"},
  {"Number":"9103","Name":"DON VALLEY PARKWAY & PRINCE EDWARD VIADUCT / BLOOR ST E @ 665m NORTH OF","Latitude":"43.681539","Longitude":"-79.362799","D1":"n","D2":"","D3":"s","D4":"","Group":"DVP"},
  {"Number":"9104","Name":"DON VALLEY PARKWAY & BEECHWOOD CRES @ 460m SOUTH OF","Latitude":"43.69345","Longitude":"-79.357309","D1":"n","D2":"","D3":"s","D4":"","Group":"DVP"},
  {"Number":"9105","Name":"DON VALLEY PARKWAY & MILLWOOD RD","Latitude":"43.698183","Longitude":"-79.349517","D1":"n","D2":"e","D3":"s","D4":"","Group":"DVP"},
  {"Number":"9106","Name":"DON VALLEY PARKWAY & DON MILLS RD","Latitude":"43.700599","Longitude":"-79.337605","D1":"n","D2":"e","D3":"s","D4":"w","Group":"DVP"},
  {"Number":"9108","Name":"DON VALLEY PARKWAY & SPANBRIDGE RD @ 720m SOUTH OF","Latitude":"43.707686","Longitude":"-79.331318","D1":"n","D2":"","D3":"s","D4":"","Group":"DVP"},
  {"Number":"9109","Name":"DON VALLEY PARKWAY & SPANBRIDGE RD","Latitude":"43.712617","Longitude":"-79.325028","D1":"n","D2":"e","D3":"s","D4":"w","Group":"DVP"},
  {"Number":"9110","Name":"DON VALLEY PARKWAY & ST DENNIS DR @ 140m SOUTH OF","Latitude":"43.718065","Longitude":"-79.327286","D1":"n","D2":"","D3":"s","D4":"","Group":"DVP"},
  {"Number":"9111","Name":"DON VALLEY PARKWAY & EGLINTON AVE E","Latitude":"43.723531","Longitude":"-79.329997","D1":"n","D2":"e","D3":"s","D4":"w","Group":"DVP"},
  {"Number":"9112","Name":"DON VALLEY PARKWAY & WYNFORD DR","Latitude":"43.726991","Longitude":"-79.330014","D1":"n","D2":"e","D3":"s","D4":"w","Group":"DVP"},
  {"Number":"9113","Name":"DON VALLEY PARKWAY & CONCORDE GT @ 185m NORTH OF","Latitude":"43.73094","Longitude":"-79.330519","D1":"n","D2":"","D3":"s","D4":"","Group":"DVP"},
  {"Number":"9114","Name":"DON VALLEY PARKWAY & LAWRENCE AVE E","Latitude":"43.739672","Longitude":"-79.331824","D1":"n","D2":"e","D3":"s","D4":"w","Group":"DVP"},
  {"Number":"9115","Name":"DON VALLEY PARKWAY & BROOKBANKS DR @ 300m SOUTH OF","Latitude":"43.749247","Longitude":"-79.333252","D1":"n","D2":"","D3":"s","D4":"","Group":"DVP"},
  {"Number":"9116","Name":"DON VALLEY PARKWAY & YORK MILLS RD","Latitude":"43.757956","Longitude":"-79.33537","D1":"n","D2":"e","D3":"s","D4":"w","Group":"DVP"},
  {"Number":"9200","Name":"DON VALLEY PARKWAY & FGG","Latitude":"43.649968","Longitude":"-79.349281","D1":"n","D2":"e","D3":"","D4":"w","Group":"Gardiner"},
  {"Number":"9201","Name":"F G GARDINER XY & CHERRY ST / PARLIAMENT ST @ 300m WEST OF","Latitude":"43.648217","Longitude":"-79.359507","D1":"","D2":"e","D3":"","D4":"w","Group":"Gardiner"},
  {"Number":"9202","Name":"F G GARDINER XY & JARVIS ST","Latitude":"43.645627","Longitude":"-79.370023","D1":"","D2":"e","D3":"","D4":"w","Group":"Gardiner"},
  {"Number":"9203","Name":"F G GARDINER XY & YORK ST @ 190m  EAST OF","Latitude":"43.642453","Longitude":"-79.378905","D1":"","D2":"e","D3":"","D4":"w","Group":"Gardiner"},
  {"Number":"9204","Name":"F G GARDINER XY & REES ST","Latitude":"43.639436","Longitude":"-79.386974","D1":"n","D2":"e","D3":"","D4":"w","Group":"Gardiner"},
  {"Number":"9205","Name":"F G GARDINER XY & SPADINA AVE @ 175m WEST","Latitude":"43.638147","Longitude":"-79.394371","D1":"","D2":"e","D3":"","D4":"w","Group":"Gardiner"},
  {"Number":"9206","Name":"F G GARDINER XY & BATHURST ST","Latitude":"43.637827","Longitude":"-79.40048","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Gardiner"},
  {"Number":"9207","Name":"F G GARDINER XY & STRACHAN AVE @ 50m WEST OF","Latitude":"43.637362","Longitude":"-79.41067","D1":"","D2":"e","D3":"","D4":"w","Group":"Gardiner"},
  {"Number":"9208","Name":"F G GARDINER XY & DUFFERIN ST @ 265m EAST OF","Latitude":"43.634504","Longitude":"-79.422245","D1":"","D2":"e","D3":"","D4":"w","Group":"Gardiner"},
  {"Number":"9209","Name":"F G GARDINER XY & DOWLING AVE","Latitude":"43.634128","Longitude":"-79.437883","D1":"","D2":"e","D3":"","D4":"w","Group":"Gardiner"},
  {"Number":"9210","Name":"F G GARDINER XY & PARKSIDE DR @ 300m  EAST OF","Latitude":"43.638305","Longitude":"-79.449944","D1":"","D2":"e","D3":"","D4":"w","Group":"Gardiner"},
  {"Number":"9211","Name":"F G GARDINER XY & ELLIS AVE @ 300m EAST OF","Latitude":"43.637943","Longitude":"-79.462207","D1":"","D2":"e","D3":"","D4":"w","Group":"Gardiner"},
  {"Number":"9212","Name":"F G GARDINER XY & SOUTH KINGSWAY @ 150m EAST OF","Latitude":"43.634974","Longitude":"-79.46954","D1":"","D2":"e","D3":"s","D4":"w","Group":"Gardiner"},
  {"Number":"9213","Name":"F G GARDINER XY & PALACE PIER CRT @ 50m WEST OF","Latitude":"43.631065","Longitude":"-79.476125","D1":"","D2":"e","D3":"s","D4":"w","Group":"Gardiner"},
  {"Number":"9214","Name":"F G GARDINER XY & PARK LAWN RD @ 400m EAST OF","Latitude":"43.62731","Longitude":"-79.481856","D1":"","D2":"e","D3":"s","D4":"w","Group":"Gardiner"},
  {"Number":"9215","Name":"F G GARDINER XY & GRAND AVE","Latitude":"43.624464","Longitude":"-79.493334","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Gardiner"},
  {"Number":"9216","Name":"F G GARDINER XY & ROYAL YORK RD","Latitude":"43.622382","Longitude":"-79.500659","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Gardiner"},
  {"Number":"9217","Name":"F G GARDINER XY & ISLINGTON AVE","Latitude":"43.620011","Longitude":"-79.51259","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Gardiner"},
  {"Number":"9218","Name":"F G GARDINER XY & KIPLING AVE","Latitude":"43.617417","Longitude":"-79.525406","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Gardiner"},
  {"Number":"9219","Name":"F G GARDINER XY & WICKMAN RD @ 95m WEST OF","Latitude":"43.616549","Longitude":"-79.531453","D1":"","D2":"e","D3":"","D4":"w","Group":"Gardiner"},
  {"Number":"9220","Name":"F G GARDINER XY & GARDINER 427 C N RAMP","Latitude":"43.614837","Longitude":"-79.54671","D1":"","D2":"e","D3":"","D4":"w","Group":"Gardiner"},
  {"Number":"9221","Name":"F G GARDINER XY & DVP","Latitude":"43.6501","Longitude":"-79.349418","D1":"","D2":"e","D3":"","D4":"w","Group":"Gardiner"},
  {"Number":"9300","Name":"LAKE SHORE BLVD E & DON ROADWAY","Latitude":"43.65112","Longitude":"-79.346999","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Lake Shore"},
  {"Number":"9301","Name":"LAKE SHORE BLVD E & PARLIAMENT ST","Latitude":"43.647587","Longitude":"-79.361403","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Lake Shore"},
  {"Number":"9302","Name":"LAKE SHORE BLVD E & LOWER JARVIS ST","Latitude":"43.645686","Longitude":"-79.369774","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Lake Shore"},
  {"Number":"9303","Name":"LAKE SHORE BLVD & YONGE ST","Latitude":"43.64439","Longitude":"-79.375767","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Lake Shore"},
  {"Number":"9304","Name":"LAKE SHORE BLVD W & BAY ST","Latitude":"43.643334","Longitude":"-79.377829","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Lake Shore"},
  {"Number":"9305","Name":"LAKE SHORE BLVD W & YORK ST","Latitude":"43.641037","Longitude":"-79.380861","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Lake Shore"},
  {"Number":"9306","Name":"LAKE SHORE BLVD W & REES ST","Latitude":"43.639504","Longitude":"-79.387014","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Lake Shore"},
  {"Number":"9307","Name":"LAKE SHORE BLVD W & SPADINA AVE @ 175m WEST OF","Latitude":"43.638147","Longitude":"-79.394371","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Lake Shore"},
  {"Number":"9308","Name":"LAKE SHORE BLVD W & REMEMBRANCE DR","Latitude":"43.635599","Longitude":"-79.403578","D1":"n","D2":"e","D3":"","D4":"w","Group":"Lake Shore"},
  {"Number":"9309","Name":"LAKE SHORE BLVD W & NEWFOUNDLAND RD / ONTARIO PLACE BLVD @ 100m EAST OF","Latitude":"43.632768","Longitude":"-79.40975","D1":"","D2":"e","D3":"","D4":"w","Group":"Lake Shore"},
  {"Number":"9310","Name":"LAKE SHORE BLVD W & ONTARIO DR / REMEMBRANCE DR @ 100m EAST OF","Latitude":"43.630519","Longitude":"-79.418522","D1":"","D2":"e","D3":"","D4":"w","Group":"Lake Shore"},
  {"Number":"9311","Name":"LAKE SHORE BLVD W & BRITISH COLUMBIA RD / LAKESHORE BRITISH COLUMBIA RAMP @ 180m EAST OF","Latitude":"43.630497","Longitude":"-79.427348","D1":"","D2":"e","D3":"","D4":"w","Group":"Lake Shore"},
  {"Number":"9312","Name":"LAKE SHORE BLVD W & BRITISH COLUMBIA RD / LAKESHORE BRITISH COLUMBIA RAMP @ 100m WEST OF","Latitude":"43.632077","Longitude":"-79.430118","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Lake Shore"},
  {"Number":"9313","Name":"LAKE SHORE BLVD W & BRITISH COLUMBIA RD / LAKESHORE BRITISH COLUMBIA RAMP @ 150m WEST OF","Latitude":"43.631746","Longitude":"-79.430991","D1":"n","D2":"e","D3":"","D4":"w","Group":"Lake Shore"},
  {"Number":"9314","Name":"LAKE SHORE BLVD W & OARSMAN DR @ 45m EAST OF","Latitude":"43.632636","Longitude":"-79.4362","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Lake Shore"},
  {"Number":"9315","Name":"LAKE SHORE BLVD W & PRIVATE ACCESS @ 60m WEST OF - SUNNYSIDE BEACH EXIT ONLY","Latitude":"43.637377","Longitude":"-79.44994","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Lake Shore"},
  {"Number":"9316","Name":"LAKE SHORE BLVD W & COLBORNE LODGE DR @ 265m EAST OF","Latitude":"43.638257","Longitude":"-79.455778","D1":"","D2":"e","D3":"","D4":"w","Group":"Lake Shore"},
  {"Number":"9317","Name":"LAKE SHORE BLVD W & COLBORNE LODGE DR","Latitude":"43.637687","Longitude":"-79.458745","D1":"n","D2":"e","D3":"","D4":"w","Group":"Lake Shore"},
  {"Number":"9318","Name":"LAKE SHORE BLVD W & ELLIS AVE","Latitude":"43.6363","Longitude":"-79.465106","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Lake Shore"},
  {"Number":"9319","Name":"LAKE SHORE BLVD W & PALACE PIER CRT","Latitude":"43.631353","Longitude":"-79.472452","D1":"","D2":"e","D3":"","D4":"","Group":"Lake Shore"},
  {"Number":"9320","Name":"LAKE SHORE BLVD W & PALACE PIER CRT","Latitude":"43.631275","Longitude":"-79.474494","D1":"","D2":"","D3":"","D4":"w","Group":"Lake Shore"},
  {"Number":"9321","Name":"LAKE SHORE BLVD W & PALACE PIER CRT @ 325m WEST OF","Latitude":"43.62916","Longitude":"-79.478393","D1":"","D2":"e","D3":"s","D4":"w","Group":"Lake Shore"},
  {"Number":"9322","Name":"LAKE SHORE BLVD W & PARK LAWN RD / MARINE PARADE DR","Latitude":"43.623151","Longitude":"-79.481296","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Lake Shore"},
  {"Number":"9323","Name":"LAKE SHORE BLVD E & LESLIE ST","Latitude":"43.659307","Longitude":"-79.328749","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Lake Shore"},
  {"Number":"9324","Name":"LAKE SHORE BLVD E & COXWELL AVE / ASHBRIDGES BAY PARK RD","Latitude":"43.662229","Longitude":"-79.314555","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Lake Shore"},
  {"Number":"9325","Name":"LAKE SHORE BLVD E & CHERRY ST","Latitude":"43.648102","Longitude":"-79.354586","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Lake Shore"},
  {"Number":"9326","Name":"LAKE SHORE BLVD E & CHERRY ST","Latitude":"43.64936","Longitude":"-79.356591","D1":"","D2":"e","D3":"s","D4":"w","Group":"Lake Shore"},
  {"Number":"9327","Name":"LAKE SHORE BLVD E & LOWER SHERBOURNE ST","Latitude":"43.646221","Longitude":"-79.366192","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Lake Shore"},
  {"Number":"9328","Name":"LAKE SHORE BLVD E & LOWER SHERBOURNE ST","Latitude":"43.646421","Longitude":"-79.366233","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Lake Shore"},
  {"Number":"9329","Name":"LAKE SHORE BLVD W & LOWER SIMCOE ST","Latitude":"43.640397","Longitude":"-79.383122","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Lake Shore"},
  {"Number":"9330","Name":"LAKE SHORE BLVD W & SPADINA AVE","Latitude":"43.638917","Longitude":"-79.39211","D1":"","D2":"e","D3":"","D4":"w","Group":"Lake Shore"},
  {"Number":"9331","Name":"LAKE SHORE BLVD W & BATHURST ST / FLEET ST","Latitude":"43.636765","Longitude":"-79.399615","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Lake Shore"},
  {"Number":"9332","Name":"LAKE SHORE BLVD W & FORT YORK BLVD","Latitude":"43.635577","Longitude":"-79.407058","D1":"n","D2":"e","D3":"","D4":"w","Group":"Lake Shore"},
  {"Number":"9333","Name":"LAKE SHORE BLVD W & PARKSIDE DR","Latitude":"43.638261","Longitude":"-79.453662","D1":"","D2":"","D3":"","D4":"","Group":"Lake Shore"},
  {"Number":"9334","Name":"LAKE SHORE BLVD W & STRACHAN AVE / REMEMBRANCE DR","Latitude":"43.634352","Longitude":"-79.408612","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Lake Shore"},
  {"Number":"9400","Name":"W R ALLEN RD & EGLINTON AVE W","Latitude":"43.698568","Longitude":"-79.436267","D1":"n","D2":"e","D3":"","D4":"w","Group":"Allen"},
  {"Number":"9401","Name":"W R ALLEN RD & ELM RIDGE DR","Latitude":"43.702797","Longitude":"-79.437973","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Allen"},
  {"Number":"9402","Name":"W R ALLEN RD & VIEWMOUNT AVE","Latitude":"43.707616","Longitude":"-79.440469","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Allen"},
  {"Number":"9403","Name":"W R ALLEN RD & GLENGROVE AVE","Latitude":"43.711222","Longitude":"-79.442755","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Allen"},
  {"Number":"9404","Name":"W R ALLEN RD & LAWRENCE AVE W @ 51m NORTH OF","Latitude":"43.716458","Longitude":"-79.44479","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Allen"},
  {"Number":"9405","Name":"W R ALLEN RD & 401 C E ALLEN RD RAMP @ 150m SOUTH OF","Latitude":"43.728143","Longitude":"-79.448634","D1":"n","D2":"","D3":"s","D4":"","Group":"Allen"},
  {"Number":"9406","Name":"W R ALLEN RD & TRANSIT RD @ 280m SOUTH OF","Latitude":"43.739609","Longitude":"-79.45257","D1":"n","D2":"","D3":"s","D4":"","Group":"Allen"},
  {"Number":"9407","Name":"W R ALLEN RD & SHEPPARD AVE W","Latitude":"43.749974","Longitude":"-79.463592","D1":"n","D2":"e","D3":"s","D4":"w","Group":"Allen"}
].map(function(data) {
  // Map each raw camera Object through our Camera() constructor
  return new Camera(data);
});
