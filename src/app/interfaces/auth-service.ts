import { Observable } from "rxjs";
import { IdentityClientSettings } from "../IdentityClientSettings";

export abstract class AuthService {
  public abstract isAuthenticated$: Observable<boolean>;
  public abstract initialize(settings: IdentityClientSettings): void;
  public abstract login(): void;
  public abstract logout(): void;
}
