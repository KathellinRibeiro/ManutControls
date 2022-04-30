///This service encapsulate message resource, in this case 'Swal'.
///When we like to change 'Swal' to another we only change this functions (encapsulation).

import { Injectable } from '@angular/core';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.min.js'

@Injectable({
    providedIn: 'root'
})

export class MessageService {
    ///show error function...
    showError(message: string): void {
        Swal.fire({
            title: "Ops...",
            text: message,
            type: "error"
        });
    }

    ///show success function...
    ///here we have 'callback' parameter that correponding a anything action after server operation.
    showSuccess(message: string, callback: () => void) {
        if (callback != null) {
            Swal.fire({
                title: 'Success!',
                text: message,
                type: "success",
                onClose: callback
            });
        }
        else {
            Swal.fire({
                title: 'Success!',
                text: message,
                type: "success"
            });
        }
    }

    // showQuestion(callback: () => void) {
    //     Swal.fire({
    //         title: 'Do you really want to proceed?',
    //         icon: 'question',
    //         iconHtml: 'question',
    //         confirmButtonText: 'Yes',
    //         cancelButtonText: 'No',
    //         showCancelButton: true,
    //         showCloseButton: true
    //     }).then((result) => {
    //         if (result.isConfirmed)
    //             callback();
    //     });
    // }
}
