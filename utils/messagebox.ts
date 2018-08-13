import { SimpleDialogComponent } from '../component/simple-dialog/simple-dialog.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

export class MessageBox {
  static show(dialog: MatDialog, message, title = 'Alert',
                information = '', button = 0, allow_outside_click = false,
                style = 0, width = '40%') {
    const dialogRef = dialog.open( SimpleDialogComponent, {
      data: {
        title: title || '',
        message: message,
        information: information,
        button: button || 0,
        style: style || 0,
        allow_outside_click: allow_outside_click || false
      },
      width: width
    });
    return dialogRef.afterClosed();
  }
}

export  enum MessageBoxButton {
    Ok = 0,
    OkCancel = 1,
    YesNo = 2,
    AcceptReject = 3
}

export  enum MessageBoxStyle {
    Simple = 0,
    Full = 1
}
