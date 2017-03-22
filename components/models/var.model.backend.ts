// Generated using typescript-generator version 1.7.192 on 2017-03-21 13:46:58.

declare namespace Rest {


    interface OrganizationItem {
        id: string;
        parentId: string;
        name: string;
        kod: string;
        aciklama: string;
        active: boolean;
        activeTimesStart: Calendar;
        activeHowLongInHour: number;
        tur: number;
        sahisAdi: string;
        sahisSoyadi: string;
        kullaniciAdi: string;
        email: string;
        sahisAdresi: string;
        sahisTel: string;
        sahisMobil: string;
        roles: string[];
        catalogTuru: number;
        code: string;
    }

    interface BpmnServiceItem {
        name: string;
        description: string;
        className: string;
    }

    interface Calendar {
    }

}
