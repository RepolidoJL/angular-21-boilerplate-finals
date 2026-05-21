import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { finalize, first } from 'rxjs/operators';
import { AccountService, AlertService } from '@app/_services';

@Component({ templateUrl: 'list.component.html', standalone: false })
export class ListComponent implements OnInit, OnDestroy {
    accounts: any[] = [];
    loading = false;
    private loadTimeoutId?: number;

    constructor(
        private accountService: AccountService,
        private alertService: AlertService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.loading = true;
        this.cdr.detectChanges();
        this.loadTimeoutId = window.setTimeout(() => {
            if (this.loading) {
                this.loading = false;
                this.accounts = [];
                this.alertService.error('Request timed out');
                this.cdr.detectChanges();
            }
        }, 10000);

        this.accountService.getAll()
            .pipe(first(), finalize(() => {
                clearTimeout(this.loadTimeoutId);
                this.loading = false;
                this.cdr.detectChanges();
            }))
            .subscribe(accounts => this.accounts = accounts);
    }

    ngOnDestroy() {
        clearTimeout(this.loadTimeoutId);
    }

    deleteAccount(id: string) {
        const account = this.accounts.find(x => x.id === id);
        account.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.accounts = this.accounts.filter(x => x.id !== id);
            });
    }
}