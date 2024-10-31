import { Pipe, PipeTransform } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faFacebookSquare,
  faGithub,
  faInstagram,
  faLinkedinIn,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faBlog, faLink } from '@fortawesome/free-solid-svg-icons';
@Pipe({
  name: 'toSocialLinkIcon',
  standalone: true,
})
export class ToSocialLinkIconPipe implements PipeTransform {
  transform(value: string): IconDefinition {
    switch (value) {
      case 'Twitter':
        return faXTwitter;
      case 'LinkedIn':
        return faLinkedinIn;
      case 'Instagram':
        return faInstagram;
      case 'Blog':
        return faBlog;
      case 'Facebook':
        return faFacebookSquare;
      case 'Company_Website':
      case 'Sessionize':
      case 'Other':
        return faLink;
      case 'Github':
        return faGithub;
    }
    return faLink;
  }
}
