import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { ListarDataSource, ListarItem } from './listar-datasource';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule]
})
export class ListarComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable, {static:false}) table!: MatTable<User>;
  dataSource = new MatTableDataSource<User> ([]);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'email', 'phone', 'cpf'];

  constructor(private service: UserService){}

  ngOnInit(): void {
    this.getUsers();    
  }

  getUsers(): void {
    this.service.getUsers().subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource<User>(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (erro:any) => {
        console.log(erro);
        alert('Ocorreu algum erro');
      }
    })
  }

  ngAfterViewInit():void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
