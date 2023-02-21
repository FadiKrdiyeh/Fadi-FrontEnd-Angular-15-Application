import { AuthenticationService } from './../../../../core/authentication/authentication.service';
import { User } from './../../../../shared/models/user';
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { HelpersService } from '../../../../core/services/helpers.service';

@Component({
  selector: 'fadi-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[];
  dataUsers = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor (
    private _titleService: Title,
    private _authenticationService: AuthenticationService,
    private _matDialog: MatDialog,
    private _helpersService: HelpersService
    ) {
    this._titleService.setTitle('Users');
    this.displayedColumns = ["UserId", "Username"];
  }

  /**
   * Filter users in table
   *
   * @param {Event} event
   * @memberof ListUsersComponent
   */
  applyFilter (event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataUsers.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Call authentication service to get all users
   *
   * @memberof ListUsersComponent
   */
  getUsers () {
    this._authenticationService.getUsers$().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataUsers.data = data.value;
        } else {
          this._helpersService.showAlert("Could not load users.", "Error!", 5000);
        }
      },
      error: (error) => {
        this._helpersService.showAlert("Could not load users.", "Error!", 5000);
      }
    })
  }

  /**
   * Show users when component initialized
   *
   * @memberof ListUsersComponent
   */
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUsers();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.dataUsers.paginator = this.paginator;
  }
}
