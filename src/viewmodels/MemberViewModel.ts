import { Accessor, Setter, createSignal } from 'solid-js';
import { IMemberViewModel, Member } from '../utils/interfaces'

export class MemberViewModel implements IMemberViewModel {
   // --- Private State Signals ---
  private _members: Accessor<Member[]>;
  private _isLoading: Setter<boolean>;

  // --- Publicly Exposed Accessors ---
  public readonly members: Accessor<Member[]>;
  public readonly isLoading: Accessor<boolean>;

  constructor() {
    // Initialize signals
    const [membersSignal, setMembersSignal] = createSignal<Member[]>([]);
    const [loadingSignal, setLoadingSignal] = createSignal<boolean>(false);

    // Assign signals and setters
    this._members = membersSignal;
    this._isLoading = loadingSignal;

    // Expose public accessors
    this.members = this._members;
    this.isLoading = this._isLoading;
    
  }

  public fetchMember(): Promise<void> {};
}