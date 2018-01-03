/*
*
*                                 MIT License
*
*    Copyright (c) 2017 Andrea Zago
*
*    Permission is hereby granted, free of charge, to any person obtaining a copy
*    of this software and associated documentation files (the "Software"), to deal
*    in the Software without restriction, including without limitation the rights
*    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*    copies of the Software, and to permit persons to whom the Software is
*    furnished to do so, subject to the following conditions:
*
*    The above copyright notice and this permission notice shall be included in all
*    copies or substantial portions of the Software.
*
*    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
*    SOFTWARE.
*
*/

/**
 *  Player js
 *  @author: Andreacw
 */

function searchByPlayer(playerid) {

    // Solo in caso non viene passato l'id uso il campo input per la ricerca
    if(!playerid){
        playerid = $('#searchinput').val();
    }

    $('#mainsearchpage').attr('hidden',true);

    $.ajax({
        url: playerDatabase,
        type: 'GET',
        timeout: 5000,
        contentType: 'json',
        data: {
            q: playerid
        }
    }).done(function (data) {

        if(data.length > 1){
            showUserList(data);
        }else if(data.length === 1){
            $('#playermultyresult, #gangsearchview, #gangmultyresult, #viewfactionlist, #mainsearchpage, #noresult').attr('hidden', true);
            showUser(data);
        }else{
            $('#playersearchview, #playermultyresult, #gangsearchview, #gangmultyresult, #viewfactionlist, #mainsearchpage').attr('hidden', true);
            $('#noresult').removeAttr('hidden');
        }

    }).fail(function () {
        $('#playersearchview, #playermultyresult, #gangsearchview, #gangmultyresult, #viewfactionlist, #mainsearchpage').attr('hidden', true);
        $('#errorServer').removeAttr('hidden');
        $('#modulename').html("player");
    });


}

function showUserList(data) {

    $('#playermultyresult').removeAttr('hidden');

    var searchN;

    if(data.length > searchLimiter){
        searchN = searchLimiter;
        $('#resultsize').html(searchLimiter);
    }else{
        searchN = data.length;
        $('#resultsize').html(data.length);
    }

    for (var i = 0; i < searchN; i++) {

        var userName = data[i].name;
        var playerId = data[i].playerid;
        var playerAlias = data[i].aliases;

        var listElement = $('<a style="cursor:pointer;" id="' + playerId + '" data-id="' + playerId + '" class="list-group-item list-group-item-action flex-column align-items-start">' +
            '    <div class="d-flex w-100 justify-content-between">' +
            '      <h5 class="mb-1">' + userName + '</h5>' +
            '      <small><i class="fas fa-external-link-alt"></i></small>' +
            '    </div>' +
            '    <small>Playerid: ' + playerId + ' - Alias: ' + playerAlias + '</small>' +
            '  </a>');

        $('#listUserAppendElement').append(listElement);

    }

    for (var x = 0; x < searchN; x++) {

        var playerId2 = data[x].playerid;

        $('#' + playerId2).on('click', function () {
           searchByPlayer($(this).data("id"));
        });
    }

}

/**
 *  In caso di un solo risultato compongo la visualizzazione del giocatore.
 */

function showUser(data) {

    $('#playersearchview').removeAttr('hidden');

    showUserInfo();

    // Dati vari
    $('#usernameplace').html(data[0].name);
    $('#playeridplace').html(data[0].playerid);
    $('#userbankacc').html(data[0].bankacc);
    $('#usercash').html(data[0].cash);
    $('#useralias').html(data[0].aliases);

    var linkSteam = "http://steamcommunity.com/profiles/" + data[0].playerid + "/";

    $('#steamLink').attr('href', linkSteam);

    // In base al livello donatore inserisco le stelle
    var donorlevel;

    switch(data[0].donorlevel) {
        case "1":
            donorlevel = $('<i class="fa fa-star"></i>');
            break;
        case "2":
            donorlevel = $('<i class="fa fa-star"></i><i class="fa fa-star"></i>');
            break;
        case "3":
            donorlevel = $('<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>');
            break;
        case "4":
            donorlevel = $('<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>');
            break;
        case "5":
            donorlevel = $('<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>');
            break;
        case "6":
            donorlevel = $('<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>');
            break;
        default:
            donorlevel = " Nessuno";
    }

    $('#userdonorlevel').html(donorlevel);

    // In base al livello cop del giocatore metto il nome del grado
    var copnamelevel;

    switch(data[0].coplevel){
        case "1":
            copnamelevel = " Agente - Livello 1";
            break;
        case "2":
            copnamelevel = " Agente Scelto - Livello 2";
            break;
        case "3":
            copnamelevel = " Assistente - Livello 3";
            break;
        case "4":
            copnamelevel = " Assistente Capo - Livello 4";
            break;
        case "5":
            copnamelevel = " Sovrintendente - Livello 5";
            break;
        case "6":
            copnamelevel = " Sovrintendente Capo - Livello 6";
            break;
        case "7":
            copnamelevel = " Ispettore - Livello 7";
            break;
        case "8":
            copnamelevel = " Ispettore Capo - Livello 8";
            break;
        case "9":
            copnamelevel = " Commissario - Livello 9";
            break;
        case "10":
            copnamelevel = " Questore - Livello 10";
            break;
        default:
            copnamelevel = " Non è un'agente!";
    }

    $('#usercoplevel').html(copnamelevel);

    // In base al livello med del giocatore metto il nome del grado
    var mediclevelname;

    switch(data[0].mediclevel){
        case "1":
            mediclevelname = " Medico - Livello 1";
            break;
        case "2":
            mediclevelname = " Medico - Livello 2";
            break;
        case "3":
            mediclevelname = " Medico - Livello 3";
            break;
        case "4":
            mediclevelname = " Medico - Livello 4";
            break;
        case "5":
            mediclevelname = " Medico - Livello 5";
            break;
        default:
            mediclevelname = " Non è un medico!";
    }

    $('#usermedlevel').html(mediclevelname);

    getGangName(data[0].playerid);

    getUserVehicle(data[0].playerid);

}

/**
 *  Con il playerId dell'utente creo la lista dei mezzi
 *  @param: playerid
 *  @return: gangShow
 */

function getUserVehicle(playerid) {

    $.ajax({
        url: vehicleDatabase,
        type: 'GET',
        timeout: 5000,
        contentType: 'json',
        data: {
            q: playerid
        }
    }).done(function (data) {

        if(data.length > 0){

            $('#vehiclesize').html("Possiede " + data.length + " veicoli:");

            for (var i = 0; i < data.length; i++) {

                var vehicleName;
                var vehicleType;
                var vehicleSide = data[i].side;
                var vehiclePlate = data[i].plate;
                var vehicleColor = data[i].color;

                switch (data[i].classname) {
                    // Auto
                    case 'B_Quadbike_01_F':
                        vehicleName = 'Quad';
                        break;
                    case 'C_Offroad_01_F':
                        vehicleName = 'Offroad';
                        break;
                    case 'C_Offroad_01_repair_F':
                        vehicleName = 'Offroad (Ripara)';
                        break;
                    case 'C_Offroad_02_unarmed_F':
                        vehicleName = 'Offroad (Mimetico)';
                        break;
                    case 'O_G_Offroad_01_F':
                        vehicleName = 'Offroad (Mimetico)';
                        break;
                    case 'C_SUV_01_F':
                        vehicleName = 'Suv';
                        break;
                    case 'C_Hatchback_01_F':
                        vehicleName = 'Hatchback';
                        break;
                    case 'C_Hatchback_01_sport_F':
                        vehicleName = 'Hatchback (Sport)';
                        break;
                    case 'O_MRAP_02_F':
                        vehicleName = 'Ifrit';
                        break;
                    case 'B_MRAP_01_F':
                        vehicleName = 'Hunter';
                        break;
                    case 'O_T_LSV_02_unarmed_black_F':
                        vehicleName = 'Quilin (Nero)';
                        break;
                    case 'B_LSV_01_unarmed_black_F':
                        vehicleName = 'Prowler (Nero)';
                        break;
                    case 'I_G_Van_01_transport_F':
                        vehicleName = 'Furgone (Cassone)';
                        break;
                    // Zamak
                    case 'O_Truck_02_transport_F':
                        vehicleName = 'Zamak (Trasporto)';
                        break;
                    case 'O_Truck_02_covered_F':
                        vehicleName = 'Zamak (Telonato)';
                        break;
                    case 'I_Truck_02_covered_F':
                        vehicleName = 'Zamak (Telonato)';
                        break;
                    case 'O_Truck_02_fuel_F':
                        vehicleName = 'Zamak (Carburante)';
                        break;
                    // HEMTT
                    case 'B_Truck_01_transport_F':
                        vehicleName = 'HEMTT (Trasporto)';
                        break;
                    case 'B_Truck_01_covered_F':
                        vehicleName = 'HEMTT (Telonato)';
                        break;
                    case 'B_Truck_01_box_F':
                        vehicleName = 'HEMTT (Cassone)';
                        break;
                    case 'B_Truck_01_fuel_F':
                        vehicleName = 'HEMTT (Carburante)';
                        break;
                    case 'B_Truck_01_mover_F':
                        vehicleName = 'HEMTT (Solo cabina)';
                        break;
                    // Camioncino
                    case 'C_Van_01_box_F':
                        vehicleName = 'Furgone (Cassone)';
                        break;
                    case 'C_Van_01_fuel_F':
                        vehicleName = 'Furgone (Carburante)';
                        break;
                    // Tempest
                    case 'O_T_Truck_03_covered_ghex_F':
                        vehicleName = 'Tempest Apex (Telonato)';
                        break;
                    case 'O_Truck_03_transport_F':
                        vehicleName = 'Tempest (Trasporto)';
                        break;
                    case 'O_Truck_03_fuel_F':
                        vehicleName = 'Tempest (Carburante)';
                        break;
                    case 'O_Truck_03_covered_F':
                        vehicleName = 'Tempest (Telonato)';
                        break;
                    // Altro
                    case 'C_Kart_01_Fuel_F':
                        vehicleName = 'Kart';
                        break;
                    case 'C_Van_02_transport_F':
                        vehicleName = 'Camioncino (Trasporto)';
                        break;
                    case 'C_Van_02_vehicle_F':
                        vehicleName = 'Camioncino (Cargo)';
                        break;
                    case 'C_Van_02_medevac_F':
                        vehicleName = 'Ambulanza';
                        break;
                    // Elicotteri
                    case 'C_Heli_Light_01_civil_F':
                        vehicleName = 'MH-900';
                        break;
                    case 'B_Heli_Light_01_F':
                        vehicleName = 'Hummingbird';
                        break;
                    case 'B_Heli_Transport_01_F':
                        vehicleName = 'Ghosthawk';
                        break;
                    case 'O_Heli_Transport_04_F':
                        vehicleName = 'Mi-290 Taru';
                        break;
                    case 'O_Heli_Transport_04_medevac_F':
                        vehicleName = 'Mi-290 Taru (Medico) ';
                        break;
                    case 'B_Heli_Transport_03_unarmed_F':
                        vehicleName = 'Huron';
                        break;
                    case 'B_Heli_Light_01_stripped_F':
                        vehicleName = 'Hummingbird (Ricettato)';
                        break;
                    case 'O_Heli_Light_02_unarmed_F':
                        vehicleName = 'PO-30 Orca (Disarmata)';
                        break;
                    case 'I_Heli_Transport_02_F':
                        vehicleName = 'AW101 Mohawk (Merlin)';
                        break;
                    case 'I_Heli_light_03_unarmed_F':
                        vehicleName = 'WY-55 Hellcat';
                        break;
                    case 'B_T_VTOL_01_infantry_F':
                        vehicleName = 'V-44 X Blackfish (Fanteria)';
                        break;
                    case 'B_T_VTOL_01_vehicle_F':
                        vehicleName = 'V-44 X Blackfish (Veicoli)';
                        break;
                    case 'B_T_VTOL_01_armed_F':
                        vehicleName = 'V-44 X Blackfish (Armato)';
                        break;
                    case 'C_Plane_Civil_01_racing_F':
                        vehicleName = 'Caesar BTT (Corsa)';
                        break;
                    // Barche
                    case 'C_Rubberboat':
                        vehicleName = 'Gommone';
                        break;
                    case 'B_Boat_Transport_01_F':
                        vehicleName = 'Gommone';
                        break;
                    case 'O_Lifeboat':
                        vehicleName = 'Gommone da salvataggio';
                        break;
                    case 'O_T_Boat_Transport_01_F':
                        vehicleName = 'Gommone';
                        break;
                    case 'B_Boat_Armed_01_minigun_F':
                        vehicleName = 'Barca armata (Minigun)';
                        break;
                    case 'C_Boat_Civil_01_F':
                        vehicleName = 'Motoscafo';
                        break;
                    case 'C_Boat_Civil_01_police_F':
                        vehicleName = 'Motoscafo (Polizia)';
                        break;
                    case 'C_Boat_Civil_01_rescue_F':
                        vehicleName = 'Motoscafo (Soccorso)';
                        break;
                    case 'B_SDV_01_F':
                        vehicleName = 'Sommergibile (SDV)';
                        break;
                    case 'O_SDV_01_F':
                        vehicleName = 'Sommergibile (SDV)';
                        break;
                    case 'C_Scooter_Transport_01_F':
                        vehicleName = "Moto d'acqua";
                        break;
                    default:
                        vehicleName = data[i].classname;
                }

                var iconcolor;
                var sideText;

                if(vehicleSide === "cop"){
                    iconcolor = "#4286f4";
                    sideText = "Veicolo della polizia";
                }else if(vehicleSide === "med"){
                    iconcolor = "#d8a011";
                    sideText = "Veicolo medico";
                }else{
                    iconcolor = "#ffffff";
                    sideText = "Veicolo civile"
                }

                if(data[i].type === "Car"){
                    vehicleType = '<i class="fas fa-car" style="color: ' + iconcolor + ';"></i>';
                }else if(data[i].type === "Air"){
                    vehicleType = '<i class="fas fa-plane" style="color: ' + iconcolor + ';"></i>';
                }else{
                    vehicleType = '<i class="fas fa-ship" style="color: ' + iconcolor + ';"></i>';
                }


                var vehicle = $('<div class="col-12 padbot">' +
                    '                        <div class="card">' +
                    '                            <div class="card-body">' +
                    '                                <h4 class="card-title">'+ vehicleType + ' ' + vehicleName +'</h4>' +
                    '                                <h6 class="card-subtitle mb-2 text-muted">' + sideText + ', targato '+ vehiclePlate +' (colore '+vehicleColor+')</h6>' +
                    '                            </div>' +
                    '                        </div>' +
                    '                    </div>');
                

                $('#uservehicleappender').append(vehicle);

            }

        }else{
            $('#vehiclesize').html("Questo utente non possiede veicoli!");
        }

    }).fail(function () {
        $('#playersearchview, #playermultyresult, #gangsearchview, #gangmultyresult, #viewfactionlist, #mainsearchpage').attr('hidden', true);
        $('#errorServer').removeAttr('hidden');
        $('#modulename').html("vehicle");
    });

}

/**
 *  Tramite il tipo ritorno la visualizzazione e l'elenco della fazione x
 *  @param: type
 *  @return: viewfactionlist
 */

function showFactionList(type) {

    // TODO: Richiesto Json esposto direttamente con la lista fazioni in modo da non esporre al client la ricerca ed i dati degli utenti.

    $.ajax({
        url: playerDatabase,
        type: 'GET',
        dataType: "json",
        timeout: 5000
    }).done(function (data) {

        var counterm = 1;
        var countotalm;

        for (var i = 0; i < data.length; i++) {

            var side;

            var sideCop = data[i].coplevel;
            var sideMed = data[i].mediclevel;

            if(type === "cop"){
                $('#factionName').html("Elenco agenti in servizio");
                side = sideCop;
            }else if(type === "med"){
                $('#factionName').html("Elenco medici in servizio");
                side = sideMed;
            }else{
                console.log("Type necessario");
            }

            if (!(side === '0' || side === undefined)) {

                if (data[i].adminlevel === '0') {

                    $('#playersearchview, #playermultyresult, #gangsearchview, #gangmultyresult, #mainsearchpage, #noresult').attr('hidden', true);
                    $('#viewfactionlist').removeAttr('hidden');
                    countotalm = counterm++;

                    var plkPat = new RegExp('\[PLK\]', 'gi');
                    var name = data[i].name;
                    var playerid = data[i].playerid;
                    var division;

                    // cerco i membri della plk dalla tag (sperando ci sia)
                    var cir = name.search(plkPat);

                    if(cir === 1 && type === "cop"){
                        division = '<i style="color: #759bc9" title="Polizia Locale" class="fas fa-building"></i>';
                    }else if(type === "cop"){
                        division = '<i style="color: #3D6594" title="Polizia di Stato" class="fas fa-balance-scale"></i>';
                    }else{
                        division = '<i style="color: #f18e38" title="Medico" class="fas fa-medkit"></i>';
                    }

                    var factionsMembers = $('<tr>' +
                        '    <th scope="row">' + countotalm + '</th>' +
                        '    <td> ' + name +'</td>' +
                        '    <td class="statsdiv" style="text-align: center !important;">' + division + '</td>' +
                        '    <td class="statsdiv" style="text-align: center !important;">' + side + '</td>' +
                        '    <td title="Visualizza dettagli utente"  data-toggle="tooltip" id="'+playerid+'" data-id="'+playerid+'" data-placement="top" style="color: #007BCC;cursor:pointer;"><i class="fas fa-external-link-alt"></i></td>' +
                        '</tr>');

                    $('#appendFactionsMembers').append(factionsMembers);


                }

            }

        }

        $('#factionCounter').html($('#appendFactionsMembers tr').length);

        for (var x = 0; x < data.length; x++) {

            if(type === "cop"){
                side = data[x].coplevel;
            }else{
                side = data[x].mediclevel;
            }


            if (!(side === '0' || side === undefined)) {

                if (data[x].adminlevel === '0') {

                    var membersid2 = data[x].playerid;

                    $('#' + membersid2).on('click', function () {
                        searchByPlayer($(this).data("id"));
                    });

                }
            }
        }

    }).fail(function () {
        $('#playersearchview, #playermultyresult, #gangsearchview, #gangmultyresult, #viewfactionlist, #mainsearchpage').attr('hidden', true);
        $('#errorServer').removeAttr('hidden');
        $('#modulename').html("player");
    });
}

/*
// --- CODICE DELLA STRADA ---
{"STR_Crime_1","1000","1"}, // Competizioni illegali
{"STR_Crime_2","300","2"}, // Guida senza patente
{"STR_Crime_3","400","3"}, // Guida pericolosa
{"STR_Crime_4","400","4"},  // Oltre i 10 km/h
{"STR_Crime_5","1000","5"}, // Oltre i 20 km/h
{"STR_Crime_6","2000","6"}, // Oltre i 30 km/h
{"STR_Crime_7","3000","7"}, // Oltre i 40 km/h
//{"STR_Crime_8","5000","8"}, // Oltre i 60 km/h
{"STR_Crime_9","90","9"}, // Guida a fari spenti
{"STR_Crime_10","120","10"}, // Veicolo in divieto di sosta
// --- CODICE PENALE ---
{"STR_Crime_11","220","11"}, // Disturbo alla quiete pubblica
{"STR_Crime_12","500","12"}, // Procurato allarme
{"STR_Crime_13","500","13"}, // Molestie ad un agente
//{"STR_Crime_14","1000","14"}, // Tentato suicidio
{"STR_Crime_15","1500","15"}, // Istigazione al suicidio
{"STR_Crime_16","2000","16"}, // Istigazione al delinquere
{"STR_Crime_17","50","17"}, // Offese al pudore
{"STR_Crime_18","10000","18"}, // Bracconaggio
{"STR_Crime_19","10000","19"}, // Evasione
{"STR_Crime_20","5000","20"}, // Complicita' in evasione
//{"STR_Crime_21","2500","21"}, // Tentato furto di un veicolo
{"STR_Crime_22","2000","22"}, // Utilizzo/Possesso di esplosivi
{"STR_Crime_23","4000","23"}, // Rapina
{"STR_Crime_24","8000","24"}, // Sequestro
{"STR_Crime_25","5000","25"}, // Tentato sequestro
//{"STR_Crime_26","7500","26"}, // Possesso di droga
//{"STR_Crime_27","10000","27"}, // Traffico di droga
{"STR_Crime_28","4000","28"}, // Furto di beni personali
{"STR_Crime_29","4000","29"}, // Ricettazione
{"STR_Crime_30","2500","30"}, // Tentato furto di veicolo civile
{"STR_Crime_31","5000","31"}, // Furto di veicolo civile
{"STR_Crime_32","3500","32"}, // Tentato furto di veicolo polizia
{"STR_Crime_33","6000","33"}, // Furto di veicolo polizia
{"STR_Crime_34","5000","34"}, // Possesso di arma illegale
{"STR_Crime_35","7500","35"}, // Possesso di arma illegale aggravato
{"STR_Crime_36","2500","36"}, // Possesso di equipaggiamento illegale
{"STR_Crime_37","2000","37"}, // Fuga dalla polizia
{"STR_Crime_38","5000","38"}, // Omicidio
{"STR_Crime_39","10000","39"}, //Vendita illegale di armi
{"STR_Crime_40","2500","40"}, //Uso di armi in citta
{"STR_Crime_41","4000","41"}, // Estorsione
{"STR_Crime_42","2500","42"}, // Tentata rapina
{"STR_Crime_43","1500","43"}, // Complicità in rapina
{"STR_Crime_44","7500","44"}, // Possesso di droga
{"STR_Crime_45","1000","45"}, //Uso di stupefacenti
{"STR_Crime_46","5000","46"}, // Terrorismo
{"STR_Crime_47","1000","47"}, // Violazione spazio aereo urbano
{"STR_Crime_48","750","48"}, // Atterraggio senza autorizzazione
{"STR_Crime_49","1500","49"}, // Prostituzione
{"STR_Crime_50","50000","50"}, // Tentata evasione
{"STR_Crime_51","2500","51"}, // Complicità in rapina
{"STR_Crime_52","700","52"}, // Guida di mezzo non autorizzato
{"STR_Crime_53","500","53"} // Mancanza di documenti identificativi*/